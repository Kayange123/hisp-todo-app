import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../apis";

const ItemEdit = () => {
  const initialForm = { title: "", description: "", completed: false };
  const id = useParams().id;
  const navigate = useNavigate();
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem("todo")));
  const [form, setForm] = useState({ ...todo });
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!id) return;
    try {
      setIsLoading(true);
      const res = await api.updateTodos(id, form);
      if (res?.status === 200) {
        toast.success("Updated successfully");
        navigate(`/${id}`);
      }
    } catch (error) {
      toast.error("Error :" + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-4/5 mx-auto">
      <form>
        <div>
          <label className="text-xl text-gray-600 pb-2" htmlFor="title">
            Title
          </label>
          <textarea
            rows={5}
            className="w-full border-2 text-lg max-h-20 rounded-xl p-4 text-gray-700"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="">
          <label className="text-xl text-gray-600 pb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full  text-xl/6 border-2 p-4 rounded-xl max-h-32 text-gray-700"
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            cols={20}
            rows={5}
          />
        </div>
        <div className="w-full">
          {/* <p className="py-2 font-bold text-gray-600 text-xl">Complete Task</p> */}
          <div className="w-full py-3 px-4 ">
            <label className="w-full space-x-6 flex flex-row items-center cursor-pointer">
              <input
                className=" w-6 h-6 md:h-8 md:w-8 p-5 cursor-pointer"
                type="checkbox"
                onChange={(e) =>
                  setForm({ ...form, completed: e.target.checked })
                }
              />
              <p className="text-gray-600 text-xl">This todo is completed</p>
            </label>
          </div>
        </div>
        <div className="w-full mt-6">
          <button
            className={`w-full py-3 rounded-lg text-white  ${
              isLoading ? "bg-neutral-800/70" : "bg-green-800"
            }`}
            type="submit"
            onClick={(e) => handleUpdate(e)}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemEdit;
