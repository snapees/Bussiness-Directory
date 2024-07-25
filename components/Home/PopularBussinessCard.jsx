import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function PopularBussinessCard({ bussiness }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => router.push("/bussinessDetail/" + bussiness.id)}
    >
      <Image source={{ uri: bussiness?.imageUrl }} style={styles.image} />
      <View style={styles.textBox}>
        <Text style={styles.text}>{bussiness.name}</Text>
        <Text style={[styles.text, styles.subtext]}>{bussiness.address}</Text>
        <View style={styles.subContainer}>
          <View style={styles.ratingsBox}>
            <Image
              source={require("../../assets/images/star.png")}
              style={styles.star}
            />
            <Text style={styles.ratings}>{bussiness.ratings}</Text>
          </View>
          <Text style={styles.bussCate}>{bussiness.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  image: {
    width: 200,
    height: 130,
    borderRadius: 15,
  },
  textBox: {
    marginTop: 7,
    gap: 5,
  },
  text: {
    fontSize: 17,
    fontFamily: "outfit-medium",
    // textAlign: "center",
  },
  subtext: {
    fontSize: 13,
    fontFamily: "outfit",
    color: Colors.GREY,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingsBox: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  star: {
    width: 15,
    height: 15,
  },
  ratings: {
    fontFamily: "outfit",
  },
  bussCate: {
    fontFamily: "outfit",
    backgroundColor: Colors.PRIMARY,
    color: Colors.light.background,
    padding: 3,
    fontSize: 10,
    borderRadius: 10,
  },
});
