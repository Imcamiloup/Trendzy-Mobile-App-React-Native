// hooks/useRegister.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "@env";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const register = async (userData) => {
    console.log("userData", userData);
    try {
      await axios.post(`${API_URL}/user/register`, userData);
      const token = response.data.verificationToken;
      console.log("Usuario registrado con éxito: ", token);
    } catch (err) {
      const errorMessage = err.response ? err.response.data : err.message;
      setError(errorMessage);
      console.error("Error al registrar el usuario", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export default useRegister;
