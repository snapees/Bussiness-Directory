import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import BussinessListCard from "./BussinessListCard";
import { ScrollView } from "react-native-virtualized-view";

export default function ExploreBussinessList({ bussinessList }) {
  return (
    <ScrollView>
      <FlatList
        scrollEnabled
        showsVerticalScrollIndicator={false}
        data={bussinessList}
        renderItem={({ item, index }) => (
          <BussinessListCard key={index} bussiness={item} />
        )}
      />
      <View style={styles.no}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  no: {
    height: 200,
  },
});
