import React from "react";
import CountryCard from "../../../components/CountryCard";
import { useNavigate } from "react-router-dom";
import { formatNumberWithCommas } from "../../../utils/formatNumber";
import TableRow from "../../../components/TableRow";
import TableCell from "../../../components/TableCell";

const CountryRow = ({ country, favoriteId, handleDelete, authorized }) => {
  const goTo = useNavigate();

  const handleAddFavoriteClick = () => {
    goTo("/add-favorite-form", { state: { countryId: country.id } });
  };

  return (
    <TableRow>
      <TableCell>
        <CountryCard country={country} />
      </TableCell>
      <TableCell>{country.capital}</TableCell>
      <TableCell>{formatNumberWithCommas(country.population)}</TableCell>
      {authorized && (
        <TableCell>
          <div className="flex items-center justify-center">
            {!favoriteId ? (
              <button
                onClick={handleAddFavoriteClick}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                +
              </button>
            ) : (
              <button
                onClick={() => handleDelete(favoriteId)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                -
              </button>
            )}
          </div>
        </TableCell>
      )}
    </TableRow>
  );
};

export default CountryRow;
