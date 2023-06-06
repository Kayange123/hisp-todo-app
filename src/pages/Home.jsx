import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import TodosContainer from "../components/TodosContainer";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import * as api from "../apis";
import TodoItem from "./TodoItem";
import toast, { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation } from "react-router-dom";
import ItemEdit from "./ItemEdit";

const Home = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getTodos();
      toast.success("All todos are fetched successfully");
      setTodos(data?.data?.entries);
    } catch (error) {
      toast.error("Error:" + error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="h-screen w-full bg-white relative flex flex-1">
      <div className="h-full flex flex-col w-full">
        <Toaster position="top-center" />
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex-1 no-scrollbar overflow-y-scroll">
          <Routes>
            <Route
              path="/"
              element={
                <TodosContainer
                  todos={todos}
                  isLoading={isLoading}
                  setIsAdd={setIsAdd}
                />
              }
            />
            <Route path="/:id" element={<TodoItem />} />
            <Route path="/:id/edit" element={<ItemEdit />} />
          </Routes>
        </div>
        <Footer />
      </div>
      {isOpen && (
        <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full ">
          <Modal setIsOpen={setIsOpen} />
        </div>
      )}
    </div>
  );
};

export default Home;
