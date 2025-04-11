import { Icon } from "@iconify/react";
import ReactPaginate from "react-paginate";
import React from "react";

export default function PaginationUI({
  pageCount,
  onPageChange,
  initialPage = 0,
  currentPage,
  className = "",
}) {
  return (
    <div
      className={`flex w-full justify-center mt-2 items-center text-sm ${className}`}
    >
      <ReactPaginate
        previousLabel={
          <span className="flex items-center space-x-2 mr-4 text-gray-500">
            <Icon
              icon="material-symbols:keyboard-double-arrow-left"
              className="text-xl"
            />
            Prev
          </span>
        }
        nextLabel={
          <span className="flex items-center space-x-2 ml-4 text-gray-500">
            Next
            <Icon
              icon="material-symbols:keyboard-double-arrow-right"
              className="text-xl"
            />
          </span>
        }
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        initialPage={initialPage}
        containerClassName="flex items-center space-x-2 mt-4"
        pageClassName="bg-gray-200 text-gray-500 rounded-md"
        pageLinkClassName="px-3 py-1 block text-gray-400 rounded-md hover:bg-gray-900 hover:text-gray-100"
        activeClassName="bg-primary-default text-gray-100"
        activeLinkClassName="!text-white"
        previousClassName="rounded-md"
        nextClassName="rounded-md"
        previousLinkClassName=" py-1 block"
        nextLinkClassName=" py-1 block"
      />
    </div>
  );
}
