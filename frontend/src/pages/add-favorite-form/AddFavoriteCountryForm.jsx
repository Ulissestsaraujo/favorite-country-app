import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COUNTRIES, GET_COUNTRY } from "../../graphql/queries";
import { ADD_FAVORITE_COUNTRY_MUTATION } from "../../graphql/mutations";
import AuthenticationContext from "../../context/AuthenticationContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useFavoriteCountriesContext } from "../../context/FavoriteCountriesContext";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";

const AddFavoriteCountryForm = () => {
  const goTo = useNavigate();
  const location = useLocation();

  const [countries, setCountries] = useState([]);
  const { loading, error: errorCountries, data } = useQuery(GET_COUNTRIES);

  const [selectedCountry, setSelectedCountry] = useState(
    location?.state?.countryId ?? ""
  );
  const {
    loading: loadingCountry,
    error: errorCountry,
    data: dataCountry,
    refetch: refetchCountry,
  } = useQuery(GET_COUNTRY, {
    variables: {
      id: selectedCountry,
    },
    skip: !selectedCountry,
  });
  const { dispatch } = useFavoriteCountriesContext();
  const [error, setError] = useState("");
  const [
    addFavoriteCountry,
    { loading: loadingMutation, error: errorMutation },
  ] = useMutation(ADD_FAVORITE_COUNTRY_MUTATION, {
    onError: (error) => {
      setError(error.message);
    },
    onCompleted: () => {
      setError("");
      goTo("/");
    },
  });
  const [notes, setNotes] = useState("");
  const { userId } = useContext(AuthenticationContext);

  useEffect(() => {
    if (data.countries) {
      setCountries(data.countries);
    }
  }, [data]);

  useEffect(() => {
    if (selectedCountry) {
      refetchCountry();
    }
  }, [refetchCountry, selectedCountry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCountry) {
      setError("Please select a country and add notes.");
      return;
    }

    try {
      const response = await addFavoriteCountry({
        variables: { userId: userId, countryId: selectedCountry, notes },
      });
      dispatch({
        type: "ADD_FAVORITE",
        payload: {
          ...response?.data?.addFavoriteCountry,
          country: dataCountry?.country,
        },
      });
    } catch (err) {
      console.error("Error adding favorite country:", err);
    }
  };

  if (loading || loadingMutation || loadingCountry) return <p>Loading...</p>;
  if (errorCountries || errorMutation || errorCountry) return <p>Error :(</p>;

  return (
    <MaxWidthWrapper>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Add Favorite Country</h2>
        {error && (
          <div
            className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Country
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>
              Select a country
            </option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Favorite Country
        </button>
      </form>
    </MaxWidthWrapper>
  );
};

export default AddFavoriteCountryForm;
