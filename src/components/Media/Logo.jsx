import React from "react";
import LogoImage from "../../../assets/logo.png";
import { Image, StyleSheet } from "react-native";

const Logo = () => {
  return <Image source={LogoImage} style={styles.logo} />;
};

const styles = StyleSheet.create({
  logo: {
    width: 220,
    height: 240,
    marginBottom: 20,
  },
});

export default Logo;
