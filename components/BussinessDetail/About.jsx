import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function About({ bussiness }) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.aboutHead}>About</Text>
      <Text style={styles.about}>{bussiness?.about}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.light.background,
    padding: 20,
    // height: "100%",
  },
  aboutHead: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  about: {
    fontFamily: "outfit",
    lineHeight: 20,
  },
});
