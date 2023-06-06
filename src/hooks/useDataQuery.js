import axios from "axios";
import { useState } from "react";
import { DELETE, GET, POST, PUT } from "../constants";

export const url = "https://dev.hisptz.com/dhis2/api/dataStore/demoTodo";

const defaultObject = { method: "GET", id: "", params: {}, body: {} };

export const useFetchData = (object = { ...defaultObject }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");

  const { method, id, params, body } = object;
  let options = {
    headers: { Authorization: "Basic YWRtaW46ZGlzdHJpY3Q=" },
  };

  //Get a todo by an Id
 const getTodo = async (todoId = "data-1") => {
    const getOneOptions = { ...options, url: `${url / todoId}`, method: "GET" };
    try {
      setIsLoading(true);
      const response = await axios.request(getOneOptions);
      const data = await response.data;
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  //Get all todos
  const getTodos = async () => {
    const getAllOptions = {
      ...options,
      url: `${url}`,
      params,
      method: "GET",
    };
    try {
      setIsLoading(true);
      const response = await axios.request(getAllOptions);
      const data = await response.data;
      setData(data);
    } catch (error) {
      setError(error);
    }
  };
  //Update a todo with specified Id
  const updateTodos = async (todoId) => {
    const updateOptions = {
      ...options,
      url: `${url / todoId}`,
      method: "PUT",
      data: body,
    };
    try {
      setIsLoading(true);
      const response = await axios.request(updateOptions);
      setStatus(response.status);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  //Post a todo
  const postTodo = async (todoId) => {
    const postOptions = {
      ...options,
      url: `${url / todoId}`,
      data: body,
      method: "POST",
    };
    try {
      setIsLoading(true);
      const response = await axios.request(postOptions);
      setStatus(response.status);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  //Delete a todo
  const deleteTodo = async (todoId) => {
    const deleteOptions = {
      ...options,
      method: "DELETE",
      url: `${url / todoId}`,
    };
    try {
      setIsLoading(true);
      const response = await axios.request(deleteOptions);
      setData(response.data);
      setStatus(response.status);
    } catch (error) {
      setError(error);
    }
    const response = await axios.request(deleteOptions);
    const data = await response.data;
    setData(data);
  };
  //Switch between methods
  switch (method) {
    case GET:
      id ? getTodo(id) : getTodos();
      break;
    case POST:
      postTodo(id);
      break;
    case PUT:
      updateTodos(id);
      break;
    case DELETE:
      deleteTodo(id);
      break;
    default:
      setError("You must provide a method");
  }
  return { data, error, isLoading, status };
};
