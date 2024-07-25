import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import PopularBussinessCard from "./PopularBussinessCard";

export default function PopularBussiness() {
  const [bussinessList, setBussinessList] = useState([]);

  useEffect(() => {
    GetBussinessList();
  }, []);

  const GetBussinessList = async () => {
    setBussinessList([]);
    const q = query(collection(db, "BussinessList"), limit(10));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBussinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };
  return (
    <View>
      <View style={styles.subContainer}>
        <Text style={styles.textContainer}>Popular Bussiness</Text>
        <Text style={styles.subTextContainer}>View All</Text>
      </View>

      <FlatList
        data={bussinessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <PopularBussinessCard key={index} bussiness={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    paddingLeft: 20,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  textContainer: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  subTextContainer: {
    color: Colors.PRIMARY,
    fontFamily: "outfit-medium",
  },
});
