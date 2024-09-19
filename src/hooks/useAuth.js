import { useDispatch } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setIsLogged, setUserLoggedInfo } from "../redux/slices/authSlice";
import parseJwt from "../services/auth/parseJwt";
import { API_URL } from "@env";

const useAuth = () => {
  const dispatch = useDispatch();

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      await AsyncStorage.setItem("user", JSON.stringify(decodedToken));
      console.log("Decoded token:", decodedToken);
      if (token && decodedToken.exp * 1000 > Date.now()) {
        console.log("Token is valid");
        dispatch(setIsLogged(true));
        dispatch(setUserLoggedInfo(decodedToken));
        // Navegar a la pantalla de dashboard
      } else {
        await AsyncStorage.removeItem("token");
        dispatch(setIsLogged(false));
        console.error("Token expired");
      }
    }
  };

  const login = async (userData) => {
    console.log("User data:", userData);
    try {
      const response = await axios.post(`${API_URL}/user/login`, userData);
      const token = response.data.token;
      // Guardar el token en el almacenamiento local
      await AsyncStorage.setItem("token", token);
      if (await AsyncStorage.getItem("token")) {
        await checkToken();
      } else {
        dispatch(setIsLogged(false));
        console.error("Error al guardar el token en el almacenamiento local");
      }
      return token;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  return {
    login,
  };
};

export default useAuth;
