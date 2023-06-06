import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { VscVerifiedFilled } from "react-icons/vsc";
import { GrInProgress } from "react-icons/gr";
import * as api from "../apis";
import toast from "react-hot-toast";

const TodoItem = () => {
  const localTodo = JSON.parse(localStorage.getItem("todo"));
  const [todo, setTodo] = useState(localTodo ?? []);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchTodo = async () => {
    try {
      setIsLoading(true);
      const data = await api.getTodo(id);
      setTodo(data?.data);
      toast.success(`A todo with id : ${id} is here for you`);
    } catch (error) {
      toast.error("Error" + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await api.deleteTodo(id);
      toast.success("Todo was deleted successfully");
      localStorage.clear();
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTodo();
  }, [id, location]);

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="w-full h-full md:pt-3">
      {todo ? (
        <div className="w-4/5 mx-auto flex-wrap">
          <div className="flex w-full flex-col md:flex-row gap-6 justify-between p-4">
            <p className="font-bold text-left text-2xl font-mono text">
              Title:
            </p>
            <textarea
              className="w-full max-h-28 resize-none px-2 rounded-lg"
              value={todo?.title}
              cols="30"
              rows="10"
              readOnly
            />
          </div>
          {todo?.description && (
            <div className="flex flex-col text-left md:flex-row gap-6 justify-between p-4">
              <p className="font-bold text-2xl font-mono text">Description:</p>
              <textarea
                className="w-full resize-none max-h-[200px] min-h-max  px-2 rounded-lg"
                value={todo?.description}
                readOnly
                cols="30"
                rows="10"
              />
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-6 justify-between p-4">
            <p className="font-bold text-left text-2xl font-mono text">
              Status :
            </p>
            <div className="text-gray-600 text-xl">
              {todo?.completed ? (
                <p className="flex gap-4 items-center">
                  <VscVerifiedFilled className="text-green-600" size={25} />
                  <span>completed</span>
                </p>
              ) : (
                <div className="flex gap-4 items-center">
                  <GrInProgress size={25} />
                  <span>In progress</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row md:flex-row gap-6 justify-between p-4">
            <p className="text-xl font-bold">CreatedAt:</p>
            <p className="text-xl text-gray-600">{todo?.created}</p>
          </div>
          <div className="flex flex-row md:flex-row gap-6 justify-between p-4">
            <p className="text-xl font-bold">UpdatedAt:</p>
            <p className="text-xl text-gray-600">{todo?.lastUpdated}</p>
          </div>
          <div className="flex flex-row md:flex-row gap-6 justify-between p-4">
            <button
              disabled={todo?.completed}
              onClick={() => {
                navigate(`/${id}/edit`);
              }}
              className={`${
                todo?.completed ? "bg-neutral-800/70" : " bg-blue-900"
              } border-2 rounded-md py-2 px-4 md:px-5 text-white w-full`}
            >
              Update
            </button>
            <button
              onClick={() => {
                handleDelete(id);
              }}
              className=" flex items-center gap-3 bg-red-700 py-2 px-4 md:px-6 rounded-md"
            >
              <MdDeleteForever color="black" size={20} />
              <span className="text-white text-lg">Delete</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1>No todo</h1>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
