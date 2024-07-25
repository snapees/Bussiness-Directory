import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BussinessListCard({ bussiness }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/bussinessDetail/" + bussiness?.id)}
      style={styles.mainContainer}
    >
      <Image source={{ uri: bussiness?.imageUrl }} style={styles.image} />
      <View style={styles.subContainer}>
        <Text style={styles.name}>{bussiness?.name}</Text>
        <Text style={styles.address}>{bussiness?.address}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.light.background,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginTop: 15,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  subContainer: {
    padding: 10,
  },
  name: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  address: {
    fontFamily: "outfit",
    color: Colors.GREY,
  },
});
