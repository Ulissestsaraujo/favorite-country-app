import React, { createContext, useReducer, useContext, useEffect } from "react";
import AuthenticationContext from "./AuthenticationContext";
import { GET_COUNTRIES, GET_FAVORITE_COUNTRIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const FavoriteCountriesContext = createContext();

const initialState = {
  favoriteCountries: [],
};

const favoriteCountriesReducer = (state, action) => {
  switch (action.type) {
    case "SET_FAVORITES":
      return { ...state, favoriteCountries: action.payload };
    case "ADD_FAVORITE":
      return {
        ...state,
        favoriteCountries: [...state.favoriteCountries, action.payload],
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favoriteCountries: state.favoriteCountries.filter(
          (country) => country.id !== action.payload
        ),
      };
    case "UPDATE_FAVORITE":
      return {
        ...state,
        favoriteCountries: state.favoriteCountries.map((country) =>
          country.id === action.payload.id
            ? { ...country, ...action.payload }
            : country
        ),
      };
    default:
      return state;
  }
};

export const FavoriteCountriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoriteCountriesReducer, initialState);
  const { userId } = useContext(AuthenticationContext);
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const {
    loading: loadingFavorites,
    error: errorFavorites,
    data: dataFavorites,
    refetch,
  } = useQuery(GET_FAVORITE_COUNTRIES, {
    variables: { userId },
    skip: !userId,
  });
  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);
  useEffect(() => {
    const favoriteCountriesWithInfo = dataFavorites?.favoriteCountries?.map(
      (favoriteCountry) => {
        const correspondingCountry = data?.countries?.find(
          (country) => country.id === favoriteCountry.country_id
        );

        return {
          id: favoriteCountry.id,
          country_id: favoriteCountry.country_id,
          notes: favoriteCountry.notes,
          country: {
            population: correspondingCountry?.population ?? "-",
            capital: correspondingCountry?.capital ?? "",
            name: correspondingCountry?.name ?? "",
            flag: correspondingCountry?.flag ?? "",
          },
        };
      }
    );
    dispatch({ type: "SET_FAVORITES", payload: favoriteCountriesWithInfo });
  }, [data?.countries, dataFavorites?.favoriteCountries]);

  if (error) console.error(error);
  if (errorFavorites) console.error(errorFavorites);

  if (loading || loadingFavorites) return <>Loading..</>;

  return (
    <FavoriteCountriesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoriteCountriesContext.Provider>
  );
};

export const useFavoriteCountriesContext = () =>
  useContext(FavoriteCountriesContext);
