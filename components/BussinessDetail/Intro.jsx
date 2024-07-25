import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function Intro({ bussiness }) {
  const router = useRouter();
  return (
    <View>
      <View style={styles.iconBox}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={40}
            color={Colors.light.background}
          />
        </TouchableOpacity>
        <Ionicons
          name="heart-outline"
          size={40}
          color={Colors.light.background}
        />
      </View>

      <Image source={{ uri: bussiness?.imageUrl }} style={styles.imageBox} />

      <View style={styles.title}>
        <Text style={styles.titleName}>{bussiness?.name}</Text>
        <Text style={styles.titleAdd}>{bussiness?.address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    position: "absolute",
    zIndex: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  imageBox: {
    width: "100%",
    height: 330,
  },
  title: {
    padding: 20,
    marginTop: -20,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  titleName: {
    fontSize: 26,
    fontFamily: "outfit-bold",
  },
  titleAdd: {
    fontFamily: "outfit",
    fontSize: 18,
  },
});
