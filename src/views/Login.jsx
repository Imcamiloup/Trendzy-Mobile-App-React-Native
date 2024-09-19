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
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Logo from "../components/Media/Logo";
import { validateLoginForm } from "../utils/validations";
import InputPassword from "../components/Inputs/InputPassword";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const navigation = useNavigation();

  useEffect(() => {
    if (isLogged) {
      console.log("Login successfully");
      console.log("Is logged:", isLogged);
      navigation.navigate("Home");
    }
  }, [isLogged, navigation]);

  const handleLogin = async () => {
    validateLoginForm(email, password);
    console.log("Email:", email);
    try {
      await login({ email, password });
    } catch (error) {
      console.error("Error during login:", error);
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
