import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BussinessListCard({ bussiness }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => router.push("/bussinessDetail/" + bussiness.id)}
    >
      <Image source={{ uri: bussiness.imageUrl }} style={styles.imageBox} />
      <View style={styles.subContainer}>
        <Text style={styles.textName}>{bussiness.name}</Text>
        <Text style={styles.textAdd}>{bussiness.address}</Text>
        <View style={styles.ratingsBox}>
          <Image
            source={require("../../assets/images/star.png")}
            style={styles.star}
          />
          <Text style={styles.ratings}>{bussiness.ratings}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 15,
    backgroundColor: Colors.light.background,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    // alignItems: "center",
  },
  imageBox: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  subContainer: {
    flex: 1,
    gap: 5,
  },
  textName: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  textAdd: {
    fontFamily: "outfit",
    color: Colors.GREY,
    fontSize: 15,
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
});
