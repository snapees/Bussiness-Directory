import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function UserIntro() {
  const { user } = useUser();
  return (
    <View style={styles.mainContainer}>
      <Image source={{ uri: user?.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{user?.fullName}</Text>
      <Text style={styles.email}>
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 99,
  },
  name: {
    fontFamily: "outfit-medium",
    fontSize: 20,
  },
  email: {
    fontFamily: "outfit",
    fontSize: 15,
  },
});
