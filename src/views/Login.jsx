import React, { useState } from "react";
import {
  View,
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
import {
  validateEmail,
  validatePassword,
  validateNotEmpty,
  validatePasswordHasSpecialChar,
  validatePasswordHasNumber,
} from "../utils/validations";
import InputPassword from "../components/Inputs/InputPassword";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (!validateNotEmpty(email)) {
      setErrorMessage("El campo de correo electrónico no puede estar vacío");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Correo electrónico no válido");
      return;
    }
    if (!validateNotEmpty(password)) {
      setErrorMessage("El campo de contraseña no puede estar vacío");
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (!validatePasswordHasSpecialChar(password)) {
      setErrorMessage(
        "La contraseña debe contener al menos un carácter especial"
      );
      return;
    }
    if (!validatePasswordHasNumber(password)) {
      setErrorMessage("La contraseña debe contener al menos un número");
      return;
    }

    // Aquí puedes agregar la lógica de inicio de sesión
    console.log("Email:", email);
    console.log("Password:", password);
    setErrorMessage(""); // Limpiar mensaje de error si todo es válido
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
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
