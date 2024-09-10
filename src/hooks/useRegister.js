// hooks/useRegister.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
} from "../redux/slices/authSlice"; // Ajusta la ruta según sea necesario

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const register = async (userData) => {
    console.log("userData", userData);
    try {
      await axios.post("http://192.168.1.17:3002/api/user/register", userData);
      //dispatch(registerUserSuccess(response.data));
      console.log("Usuario registrado con éxito");
    } catch (err) {
      const errorMessage = err.response ? err.response.data : err.message;
      dispatch(registerUserFailure(errorMessage));
      setError(errorMessage);
      console.error("Error al registrar el usuario", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export default useRegister;
