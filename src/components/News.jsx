import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

const { width: viewportWidth } = Dimensions.get("window");

const News = ({ infoUserLogged }) => {
  const newsImages = [
    { uri: "https://via.placeholder.com/300x200" },
    { uri: "https://via.placeholder.com/300x200" },
    { uri: "https://via.placeholder.com/300x200" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    setActiveIndex(index);
  };

  return (
    <View style={styles.content}>
      <Text style={styles.contentText}>Hola {infoUserLogged.email}</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {newsImages.map((image, index) => (
          <View style={styles.slide} key={index}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {newsImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 20,
    color: "#333",
    marginBottom: 20,
    textAlign: "left", // Alinea el texto a la izquierda
    fontWeight: "bold", // Hace el texto en negrilla
    fontFamily: "Arial, sans-serif", // Usa una fuente moderna para redes sociales
  },
  scrollView: {
    width: viewportWidth,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 200,
    width: viewportWidth - 60,
    marginHorizontal: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  pagination: {
    flexDirection: "row",
    marginTop: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#333",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});

export default News;
