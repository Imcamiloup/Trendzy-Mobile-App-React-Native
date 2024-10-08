import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserLoggedInfo, setIsLogged } from "../redux/slices/authSlice";
import styles from "../styles/HomeStyles";
import NavBar from "../components/NavBar";
import News from "../components/News";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const infoUserLogged = useSelector((state) => state.auth.userLoggedInfo);
  const isLogged = useSelector((state) => state.auth.isLogged);

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
      <NavBar
        navigation={navigation}
        handleLogout={handleLogout}
        styles={styles}
      />
      <News infoUserLogged={infoUserLogged} />
    </View>
  );
};

export default HomeScreen;
