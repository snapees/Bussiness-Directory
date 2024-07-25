import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category({ explore = false, onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  const onCategoryPressHandler = (item) => {
    if (!explore) {
      router.push("/bussinessList/" + item.name);
    } else {
      onCategorySelect(item.name);
      // router.push("/explore/" + item.name);
    }
  };

  return (
    <View>
      {!explore && (
        <View style={styles.subContainer}>
          <Text style={styles.textContainer}>Category</Text>
          <Text style={styles.subTextContainer}>View All</Text>
        </View>
      )}
      <FlatList
        style={styles.flatContainer}
        showsHorizontalScrollIndicator={false}
        data={categoryList}
        horizontal={true}
        renderItem={({ item, index }) => (
          <CategoryItem
            category={item}
            key={index}
            onCategoryPress={(category) => onCategoryPressHandler(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  textContainer: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  subTextContainer: {
    color: Colors.PRIMARY,
    fontFamily: "outfit-medium",
  },
  flatContainer: {
    marginLeft: 20,
  },
});
