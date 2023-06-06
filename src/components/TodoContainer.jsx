import React from "react";
import { VscVerifiedFilled } from "react-icons/vsc";
import { GrInProgress } from "react-icons/gr";

const TodoContainer = ({ todo, setIsAdd }) => {
  if (!todo) return <div className="text-center">No todo</div>;
  return (
    <div
      onClick={() => {
        setIsAdd();
      }}
      className={`flex overflow-hidden p-3 h-[60px] items-center md:h-[70px] cursor-pointer rounded-xl md:rounded-2xl border-2
        ${todo?.completed ? "opacity-90" : "opacity-100"}
      `}
    >
      <div className="flex-1 text-left overflow-hidden">
        <p className="font-base text-gray-700 text-base font-sans text-ellipsis mx-2">
          {todo?.title}
        </p>
      </div>

      <div
        className={`"border-2 py-1 w-34 md:py-2 md:px-3 rounded-md flex items-center px-2 space-x-3 " ${
          todo?.completed
            ? "bg-green-500 gap-7 border-2 border-green-500"
            : "bg-neutral-50 border-2"
        }`}
      >
        <div>
          {todo?.completed ? (
            <VscVerifiedFilled className="text-green-900" size={20} />
          ) : (
            <GrInProgress size={20} />
          )}
        </div>
        <p className={`text-`}>
          {todo?.completed ? "Completed" : "Not completed"}
        </p>
      </div>
    </div>
  );
};

export default TodoContainer;
