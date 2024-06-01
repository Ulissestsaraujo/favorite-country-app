import React from "react";
import CountryCard from "../../../components/CountryCard";
import { formatNumberWithCommas } from "../../../utils/formatNumber";
import { useNavigate } from "react-router-dom";
import TableRow from "../../../components/TableRow";
import TableCell from "../../../components/TableCell";

const FavoriteCountryRow = ({ country, notes, handleDelete, favoriteId }) => {
  const goTo = useNavigate();

  const handleUpdateFavoriteClick = () => {
    goTo("/update-favorite-form", { state: { favoriteId, notes } });
  };

  return (
    <TableRow>
      <TableCell>
        <CountryCard country={country} />
      </TableCell>
      <TableCell>{country.capital}</TableCell>
      <TableCell>{formatNumberWithCommas(country.population)}</TableCell>
      <TableCell>{notes}</TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <button
            onClick={handleUpdateFavoriteClick}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Update
          </button>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <button
            onClick={() => handleDelete(favoriteId)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default FavoriteCountryRow;
