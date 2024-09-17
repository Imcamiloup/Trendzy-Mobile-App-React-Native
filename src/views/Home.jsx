import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserLoggedInfo, setIsLogged } from "../redux/slices/authSlice";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const infoUserLogged = useSelector((state) => state.auth.userLoggedInfo);

  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("user");
    dispatch(setIsLogged(false));
    dispatch(setUserLoggedInfo({}));
    console.log("Logout successfully");
    navigation.navigate("Login");
  };

  const getUserInfo = async () => {
    const userString = await AsyncStorage.getItem("user");
    if (userString) {
      dispatch(setUserLoggedInfo(JSON.parse(userString)));
    }
  };
  useEffect(() => {
    if (AsyncStorage.getItem("token")) {
      dispatch(setIsLogged(true));
      getUserInfo();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.buttonText}>Configuraciones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>
          Bienvenido a la red social {infoUserLogged.email}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 30,
  },
  banner: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#6200ea",
    paddingVertical: 10,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "red",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 20,
    color: "#333",
  },
});

export default HomeScreen;
