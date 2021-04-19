import axios from "./axios-config";

type User = {
  username: string;
  password: string;
};
export type TaskStatus = "OPEN" | "IN_PROGRESS" | "DONE";
type Task = {
  title?: string;
  description?: string;
  status?: TaskStatus;
};

type Filter = {
  search?: string;
  status?: TaskStatus;
};

export const signUp = async (data: User) => {
  try {
    const rs = await axios.post("/auth/signup", data);
    return rs;
  } catch (error) {
    return error;
  }
};

export const signIn = async (data: User) => {
  try {
    const rs = await axios.post("/auth/signin", data);
    return rs;
  } catch (error) {
    return error;
  }
};

export const GetTask = async (filter: Filter, token: string) => {
  try {
    const { search, status } = filter;
    let query = "";
    if (search && status) query = `search=${search}&status=${status}`;
    if (search) query = `search=${search}`;
    if (status) query = `status=${status}`;
    const rs = await axios.get(`/tasks?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return rs;
  } catch (error) {
    return error;
  }
};

export const getTaskById = async (id: string, token: string) => {
  try {
    const rs = await axios.post(`/auth/signin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return rs;
  } catch (error) {
    return error;
  }
};

export const addTask = async (data: Task, token) => {
  try {
    const rs = await axios.post("/tasks", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return rs;
  } catch (error) {
    return error;
  }
};

export const updateTaskStatus = async (
  id: string,
  data: Task,
  token: string
) => {
  try {
    const rs = await axios.patch(`/tasks/${id}/status`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return rs;
  } catch (error) {
    return error;
  }
};

export const deleteTask = async (id: string, token: string) => {
  try {
    const rs = await axios.delete(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return rs;
  } catch (error) {
    return error;
  }
};
