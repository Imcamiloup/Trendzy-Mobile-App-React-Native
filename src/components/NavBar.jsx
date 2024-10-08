import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const NavBar = ({ navigation, handleLogout, styles }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <View style={[styles.banner, localStyles.container]}>
      <TouchableOpacity style={localStyles.menuButton} onPress={toggleMenu}>
        <Icon name="menu" size={30} color="#fff" />
      </TouchableOpacity>
      {menuVisible && (
        <View style={localStyles.menu}>
          <View style={localStyles.menuItem}>
            <Image
              source={{ uri: "https://via.placeholder.com/50" }}
              style={localStyles.profileImage}
            />
          </View>
          <TouchableOpacity
            style={localStyles.menuItem}
            onPress={() => {
              navigation.navigate("Profile");
              toggleMenu();
            }}
          >
            <Text style={localStyles.menuItemText}>Ver Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={localStyles.menuItem}
            onPress={() => {
              navigation.navigate("Settings");
              toggleMenu();
            }}
          >
            <Text style={localStyles.menuItemText}>Configuraciones</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[localStyles.menuItem, localStyles.logoutButton]}
            onPress={() => {
              handleLogout();
              toggleMenu();
            }}
          >
            <Text style={localStyles.menuItemText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={localStyles.rightContainer}>
        {searchVisible && (
          <TextInput
            style={localStyles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Buscar..."
            placeholderTextColor="#ccc"
          />
        )}
        <TouchableOpacity
          style={localStyles.searchButton}
          onPress={toggleSearch}
        >
          <Icon name="search" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1000, // Asegura que el NavBar esté por encima de otros componentes
  },
  menuButton: {
    padding: 10,
  },
  menu: {
    position: "absolute",
    top: 71,
    left: 0,
    width: "50%",
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 2000, // Asegura que el menú esté por encima de otros componentes
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: "center",
  },
  logoutButton: {
    backgroundColor: "red",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  searchButton: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    width: 240,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#000",
    backgroundColor: "#fff",
    marginRight: 10,
  },
});

export default NavBar;
