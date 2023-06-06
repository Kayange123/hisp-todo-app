import React, { useState, useEffect } from "react";
import TodoContainer from "./TodoContainer";
import { useNavigate } from "react-router-dom";

const TodosContainer = ({ setIsAdd, todos, isLoading }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full py-3 px-5">
      <div className="h-full text-center ">
        {isLoading ? (
          <div className="m-auto">Loading...</div>
        ) : todos?.length < 1 ? (
          <div className="">
            <p>No Todos Available</p>
          </div>
        ) : (
          <div className="w-full">
            {todos &&
              todos?.map((todo) => (
                <div
                  onClick={() => {
                    localStorage?.setItem("todo", JSON.stringify(todo?.value));
                    navigate(`/${todo?.key}`);
                  }}
                  key={todo?.key}
                  className="w-full h-full my-2 mx-auto text-ellipsis"
                >
                  {todo?.value && (
                    <TodoContainer setIsAdd={setIsAdd} todo={todo?.value} />
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodosContainer;
