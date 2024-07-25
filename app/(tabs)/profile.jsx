import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import UserIntro from "../../components/Profile/UserIntro";
import MenuList from "../../components/Profile/MenuList";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function profile() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Profile",
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    });
  }, []);
  return (
    <View style={styles.mainContainer}>
      {/* User Info */}
      <UserIntro />

      {/* Menu Info */}
      <MenuList />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
});
