import React, { useEffect, useState } from "react";

const TableStructure = ({ headers, children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  //Little functionality to allow clicking on an arrow to come back up when the scrolling down the table can get too long since there's quite a few results
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowScrollTop(scrollTop > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="overflow-x-auto">
      <table className="  border-separate table-auto font-inter md:w-full bg-[#D2D2D2]">
        <thead className="md:w-full rounded-lg text-sm md:text-base font-semibold text-white">
          <tr>
            {headers.map((header, index) => {
              return (
                <th
                  key={index}
                  className="whitespace-nowrap rounded-l-lg py-3 pl-3 text-sm font-normal text-[#212B36] text-center"
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {showScrollTop && (
        <div
          className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
          onClick={scrollTop}
        >
          <span className="text-2xl">^</span>
        </div>
      )}
    </div>
  );
};

export default TableStructure;
