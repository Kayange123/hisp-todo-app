import axios from "axios";
import { DELETE, GET, PUT, POST } from "../constants";

const url = "https://dev.hisptz.com/dhis2/api/dataStore/demoTodo";

const options = {
  headers: { Authorization: "Basic YWRtaW46ZGlzdHJpY3Q=" }, //For Authorization to access the dataStore
};

const API = axios.create({
  baseURL: "https://dev.hisptz.com/dhis2/api/dataStore/demoTodo",
});

//Get a todo by an Id
export const getTodo = async (id) => {
  const getOneOptions = { ...options, url: `${url}/${id}`, method: GET };

  return API.request(getOneOptions);
};

//Get all todos
export const getTodos = async () => {
  const getAllOptions = {
    ...options,
    url: `${url}`,
    params: { fields: "." },
    method: GET,
  };

  return axios.request(getAllOptions);
};

//Update a todo with specified Id
export const updateTodos = async (id, body) => {
  const updateOptions = {
    ...options,
    url: `${url}/${id}`,
    method: PUT,
    data: { ...body },
  };

  try {
    const response = await API.request(updateOptions);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
//Post a todo
export const postTodo = async (id, body) => {
  const postOptions = {
    ...options,
    url: `${url}/${id}`,
    data: { ...body },
    method: POST,
  };
  return API.request(postOptions);
};

//Delete a todo
export const deleteTodo = (id) => {
  const deleteOptions = {
    ...options,
    method: DELETE,
    url: `${url}/${id}`,
  };

  return API.request(deleteOptions);
};
