import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
});

import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export default function useAxiosSecure() {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          signOutUser().then(() => {
            navigate("/login");
          });
        }
      }
    );
  }, []);
  return axiosSecure;
}
