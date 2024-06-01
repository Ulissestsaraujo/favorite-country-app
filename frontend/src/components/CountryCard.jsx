import React from "react";

const CountryCard = ({ country }) => {
  return (
    <div className="relative flex items-center  gap-1">
      <div className="h-8 w-8 md:h-12 md:w-12 flex items-center justify-center">
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="min-h-[22px] min-w-[22px] object-contain"
        />
      </div>
      {country.name}
    </div>
  );
};

export default CountryCard;
