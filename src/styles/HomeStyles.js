import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 30,
  },
  banner: {
    flexDirection: "row",
    justifyContent: "flex-start", // Alinea el contenido a la izquierda
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

export default styles;
