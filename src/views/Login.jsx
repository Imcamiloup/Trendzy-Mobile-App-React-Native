import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Logo from "../components/Media/Logo";
import { validateLoginForm } from "../utils/validations";
import InputPassword from "../components/Inputs/InputPassword";
import useAuth from "../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setIsLogged } from "../redux/slices/authSlice";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAutentication = async () => {
      const tokenStorage = await AsyncStorage.getItem("token");
      const isLoggedStorage = await AsyncStorage.getItem("isLogged");
      console.log("Checking if user is logged in", isLoggedStorage);
      if (tokenStorage && isLoggedStorage === "true") {
        dispatch(setIsLogged(true));
      } else {
        dispatch(setIsLogged(false));
      }
    };
    checkAutentication();
  }, []);

  useEffect(() => {
    if (isLogged) {
      console.log("Login successfully");
      console.log("Is logged:", isLogged);
      navigation.navigate("Home");
    }
  }, [isLogged, navigation]);

  const handleLogin = async () => {
    try {
      // Validar el formulario de inicio de sesión
      validateLoginForm(email, password);
      // Intentar iniciar sesión
      await login({ email, password });
      console.log("Inicio de sesión exitoso");
    } catch (error) {
      // Manejar diferentes tipos de errores
      if (error.response) {
        // Errores de respuesta del servidor
        console.error("Error durante el inicio de sesión:", {
          mensaje: error.response.data,
          status: error.response.status,
          headers: error.response.headers,
        });
      } else if (error.request) {
        // Errores de solicitud sin respuesta
        console.error(
          "Error durante el inicio de sesión: No se recibió respuesta del servidor",
          {
            request: error.request,
          }
        );
      } else {
        // Otros errores
        console.error("Error durante el inicio de sesión:", {
          mensaje: error.message,
        });
      }
    }
  };

  const handleRegisterSwitch = () => {
    console.log("Switch to register screen");
    navigation.navigate("Register");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Logo />
        <Text style={styles.title}>Iniciar Sesión</Text>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputPassword
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.customInput}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.iconButton}>
          <SimpleLineIcons name="login" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegisterSwitch}>
          <Text style={styles.registerText}>
            ¿No tienes una cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#84cef9",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
  },
  input: {
    width: "80%",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  iconButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 50,
  },
  registerText: {
    marginTop: 16,
    color: "#0000FF",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
});
