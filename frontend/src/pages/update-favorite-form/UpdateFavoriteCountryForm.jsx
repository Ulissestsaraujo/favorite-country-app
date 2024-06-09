import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_FAVORITE_COUNTRY_MUTATION } from "../../graphql/mutations";
import { useLocation, useNavigate } from "react-router-dom";
import { useFavoriteCountriesContext } from "../../context/FavoriteCountriesContext";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";

const UpdateFavoriteCountryForm = () => {
  const goTo = useNavigate();
  const location = useLocation();
  const { dispatch } = useFavoriteCountriesContext();
  const [error, setError] = useState("");
  const [
    updateFavoriteCountry,
    { loading: loadingMutation, error: errorMutation },
  ] = useMutation(UPDATE_FAVORITE_COUNTRY_MUTATION, {
    onError: (error) => {
      setError(error.message);
    },
    onCompleted: () => {
      setError("");
      goTo("/favorites");
    },
  });
  const [notes, setNotes] = useState(location?.state?.notes ?? "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateFavoriteCountry({
        variables: {
          updateFavoriteCountryId: location?.state?.favoriteId,
          notes,
        },
      });
      dispatch({
        type: "UPDATE_FAVORITE",
        payload: { id: location?.state?.favoriteId, notes },
      });
    } catch (err) {
      console.error("Error adding favorite country:", err);
    }
  };

  if (errorMutation || errorMutation) return <p>Error :(</p>;

  return (
    <MaxWidthWrapper>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Update Favorite Country</h2>
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
          Update Favorite Country
        </button>
      </form>
    </MaxWidthWrapper>
  );
};

export default UpdateFavoriteCountryForm;
