import React from "react";

const TableCell = ({ children }) => {
  return (
    <td className="px-1 hover:bg-zinc-200 py-4 text-sm font-normal text-[#637381]">
      {children}
    </td>
  );
};

export default TableCell;
