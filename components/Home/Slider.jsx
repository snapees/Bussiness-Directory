import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setSliderList((prev) => [...prev, doc.data()]);
    });
  };
  return (
    <View>
      <Text style={styles.textContainer}>#Special for you</Text>
      <FlatList
        style={styles.flatContainer}
        showsHorizontalScrollIndicator={false}
        data={sliderList}
        horizontal={true}
        renderItem={({ item, index }) => (
          <Image source={{ uri: item.imageUrl }} style={styles.imageBox} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 20,
    marginBottom: 5,
  },
  flatContainer: {
    paddingLeft: 20,
  },
  imageBox: {
    width: 300,
    height: 150,
    borderRadius: 15,
    marginRight: 15,
  },
});
