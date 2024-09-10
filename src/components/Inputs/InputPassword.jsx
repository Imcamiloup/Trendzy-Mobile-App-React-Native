// InputPassword.jsx
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const InputPassword = ({ placeholder, value, onChangeText, style }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!passwordVisible}
        autoCapitalize="none"
      />
      <TouchableOpacity
        onPress={() => setPasswordVisible(!passwordVisible)}
        style={styles.iconButton}
      >
        <Icon
          name={passwordVisible ? "visibility" : "visibility-off"}
          size={24}
          color="#000"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 0,
  },
  input: {
    flex: 1,
    padding: 16,
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  iconButton: {
    marginLeft: 8,
  },
});

export default InputPassword;
