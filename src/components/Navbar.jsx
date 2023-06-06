import React from "react";
import { IoIosAdd } from "react-icons/io";

const Navbar = ({ setIsOpen, isOpen }) => {
  return (
    <div className="w-full border-b-2 border-b- py-2">
      <div className="flex items-center justify-between w-4/5 mx-auto py-1 md:py-3">
        <div className="flex space-x-2 md:space-x-4 items-end">
          <a href="/" className="text-4xl font-bold md:text-5xl text-blue-800">
            HISP
          </a>
          <h3 className="text-gray-500 font-semibold md:font-extrabold">
            Tanzania
          </h3>
        </div>
        <div className="">
          <button
            className="flex gap-2 items-center bg-wite border p-2 rounded-lg hover:bg-blue-800 transition-all ease-in-out"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            <IoIosAdd className="text-gray-400 font-extralight" size={30} />
            <span className="font-sans text-lg hover:text-white text-gray-950 font-bold">
              Add a Todo
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
