import React, { useState, useCallback, useEffect, useMemo } from "react";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { generateId } from "../utils/generateId";
import * as api from "../apis";
import { useNavigate } from "react-router-dom";

const initialFormData = { title: "", description: "" };

const Modal = ({ setIsOpen }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [todoId, setTodoId] = useState("");
  const navigate = useNavigate();

  //Submit the POST request
  const submitForm = async (e) => {
    e.preventDefault();
    const body = {
      ...formData,
      id: todoId,
      completed: false,
      created: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    try {
      setIsAdding(true);
      const data = await api.postTodo(todoId, body);
      if (data?.status === 201) {
        toast.success("Your todo is added successfully");
        setIsOpen(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!todoId) {
      setTodoId(generateId());
    }
  }, []);

  //Submit
  return (
    <div className="mx-auto mt-32 h-fit w-4/5 bg-black opacity-100 rounded-2xl max-h-96 ">
      <div className="flex flex-col w-full">
        <div className="flex text-center p-4 border-b-2">
          <h2 className="font-bold flex-1 text-2xl text-white">Add a Todo</h2>
          <button
            className="mr-2 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <IoMdClose className="text-white" size={30} />
          </button>
        </div>
        <div className="p-3 w-full">
          <form>
            <div className="my-2">
              <input
                className="p-3 outline-none md:p-5 rounded-md w-full text-lg"
                autoComplete="off"
                type="text"
                minLength={5}
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                placeholder="Enter your title"
                required
              />
            </div>
            <div className="max-h-60 ">
              <textarea
                value={formData.description}
                className="w-full outline-none resize-none rounded-md p-3 md:p-5 text-lg max-h-52 min-h-max"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                rows={3}
                autoComplete="off"
                placeholder="Enter your Description"
              />
            </div>

            <div className="">
              <button
                className={`p-3 bg-green-700 w-full my-3 rounded-md text-white ${
                  isAdding ? "opacity-60 cursor-none" : ""
                }`}
                type="submit"
                onClick={(e) => submitForm(e)}
                disabled={isAdding || formData.title?.trim().length < 4}
              >
                {isAdding ? "Adding..." : "Add Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
