import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors.ts";
import { Ionicons } from "@expo/vector-icons";
import Category from "../../components/Home/Category.jsx";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig.jsx";
import ExploreBussinessList from "../../components/Explore/ExploreBussinessList.jsx";
import { useNavigation } from "expo-router";

export default function explore() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Explore More",
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    });
  }, []);
  const [bussinessList, setBussinessList] = useState([]);
  const GetBussinessByCategory = async (category) => {
    setBussinessList([]);
    const q = query(
      collection(db, "BussinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setBussinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };
  return (
    <View style={styles.mainContainer}>
      {/* searchBar */}
      <View style={styles.searchbar}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder="Search..." style={styles.textInput} />
      </View>

      {/* Category */}
      <Category
        explore={true}
        onCategorySelect={(category) => GetBussinessByCategory(category)}
      />

      {/* BussinessList */}
      <ExploreBussinessList bussinessList={bussinessList} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
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
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  textInput: {
    fontFamily: "outfit",
    fontSize: 15,
  },
});
