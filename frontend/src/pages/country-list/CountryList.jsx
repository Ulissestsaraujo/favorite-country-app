import React, { useCallback, useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import CountryRow from "./parts/CountryRow";
import { GET_COUNTRIES } from "../../graphql/queries";
import { DELETE_FAVORITE_COUNTRY_MUTATION } from "../../graphql/mutations";
import { useFavoriteCountriesContext } from "../../context/FavoriteCountriesContext";
import TableHeaders from "../../components/TableStructure";
import SearchBar from "../../components/SearchBar";
import AuthenticationContext from "../../context/AuthenticationContext";

const CountryList = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const { userId } = useContext(AuthenticationContext);
  const { state, dispatch } = useFavoriteCountriesContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [
    deleteFavoriteCountryMutation,
    { loading: loadingMutation, error: errorMutation },
  ] = useMutation(DELETE_FAVORITE_COUNTRY_MUTATION);

  const handleRemoveFavoriteClick = useCallback(
    async (countryId) => {
      try {
        await deleteFavoriteCountryMutation({
          variables: {
            deleteFavoriteCountryId: countryId,
          },
        });
        dispatch({ type: "REMOVE_FAVORITE", payload: countryId });
      } catch (error) {
        console.error(error);
      }
    },
    [deleteFavoriteCountryMutation, dispatch]
  );

  if (loading || loadingMutation) return <p>Loading...</p>;
  if (error || errorMutation) return <p>Error :(</p>;

  const headers = userId
    ? ["Country", "Capital", "Population", "Manage Favorites"]
    : ["Country", "Capital", "Population"];

  const filteredCountries = data.countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MaxWidthWrapper>
      <h2 className="text-2xl font-bold mb-4 mt-4 text-center">
        Add a Country to your Favorites
      </h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TableHeaders headers={headers}>
        {filteredCountries.map((country) => {
          const favoriteId = state?.favoriteCountries?.find(
            (x) => x.country_id === country.id
          )?.id;
          return (
            <CountryRow
              key={country.id}
              country={country}
              favoriteId={favoriteId}
              authorized={!!userId}
              handleDelete={handleRemoveFavoriteClick}
            />
          );
        })}
      </TableHeaders>
    </MaxWidthWrapper>
  );
};

export default CountryList;
