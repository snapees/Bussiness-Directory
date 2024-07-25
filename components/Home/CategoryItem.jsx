import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View style={styles.container}>
        <Image source={{ uri: category.icon }} style={styles.imageBox} />
      </View>
      <Text style={styles.bussinesName}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.ICON_BG,
    borderRadius: 99,
    marginRight: 15,
  },
  imageBox: {
    width: 40,
    height: 40,
  },
  bussinesName: {
    fontSize: 12,
    fontFamily: "outfit-medium",
    textAlign: "center",
    marginTop: 5,
    marginRight: 15,
  },
});
