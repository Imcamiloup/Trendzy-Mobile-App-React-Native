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
  validateConfirmPassword,
  validatePasswordHasSpecialChar,
  validatePasswordHasNumber,
} from "../utils/validations";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = () => {
    if (!validateEmail(email)) {
      setErrorMessage("Correo electrónico no válido");
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
    if (!validateConfirmPassword(password, confirmPassword)) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }

    // Aquí puedes agregar la lógica de registro
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    setErrorMessage(""); // Limpiar mensaje de error si todo es válido
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Logo />
        <Text style={styles.title}>Regístrate</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={handleRegister} style={styles.iconButton}>
          <SimpleLineIcons name="user-follow" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.registerText}>
            ¿Ya tienes una cuenta? Inicia sesión
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
