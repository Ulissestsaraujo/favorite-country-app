import React, { useCallback } from "react";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import FavoriteCountryRow from "./parts/FavoriteCountryRow";

import { DELETE_FAVORITE_COUNTRY_MUTATION } from "../../graphql/mutations";
import { useFavoriteCountriesContext } from "../../context/FavoriteCountriesContext";
import { useMutation } from "@apollo/client";
import TableStructure from "../../components/TableStructure";

const FavoriteCountryList = () => {
  const { state, dispatch } = useFavoriteCountriesContext();
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

  if (loadingMutation) return <>Loading...</>;

  if (errorMutation) return <>Error:{errorMutation}</>;

  const headers = [
    "Country",
    "Capital",
    "Population",
    "Notes",
    "Edit",
    "Delete",
  ];

  return (
    <MaxWidthWrapper>
      <h2 className="text-2xl font-bold mb-4 mt-4 text-center">
        Manage your Favorites
      </h2>
      <TableStructure headers={headers}>
        {state?.favoriteCountries?.map((favCountry) => {
          return (
            <FavoriteCountryRow
              key={favCountry.id}
              country={favCountry.country}
              notes={favCountry.notes}
              favoriteId={favCountry.id}
              handleDelete={handleRemoveFavoriteClick}
            />
          );
        })}
      </TableStructure>
    </MaxWidthWrapper>
  );
};

export default FavoriteCountryList;
