import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors.ts";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image source={{ uri: user?.imageUrl }} style={styles.imageContainer} />
        <View>
          <Text style={styles.textWelcome}>Welcome</Text>
          <Text style={styles.textName}>{user?.fullName}</Text>
        </View>
      </View>

      {/* SearchBar */}
      <View style={styles.searchbar}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder="Search..." style={styles.textInput} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  imageContainer: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  textWelcome: {
    color: Colors.light.background,
  },
  textName: {
    fontSize: 20,
    fontFamily: "outfit-medium",
    color: Colors.light.background,
  },
  searchbar: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: Colors.light.background,
    padding: 10,
    marginVertical: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  textInput: {
    fontFamily: "outfit",
    fontSize: 15,
  },
});
