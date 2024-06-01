import React from "react";

const TableRow = ({ children }) => {
  return (
    <tr className=" bg-[#f6f8fa]  drop-shadow-[0_0_10px_rgba(34,46,58,0.02)] hover:shadow-2xl overflow-auto whitespace-break-spaces">
      {children}
    </tr>
  );
};

export default TableRow;
