import { ScrollView, View } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import Category from "../../components/Home/Category";
import PopularBussiness from "../../components/Home/PopularBussiness";

export default function home() {
  return (
    <ScrollView>
      {/* header */}
      <Header />
      {/* slider */}
      <Slider />
      {/* category */}
      <Category />
      {/* bussiness list */}
      <PopularBussiness />

      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
}
