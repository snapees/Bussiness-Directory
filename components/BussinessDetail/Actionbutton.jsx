import {
  FlatList,
  Image,
  Linking,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function Actionbutton({ bussiness }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("../../assets/images/call.png"),
      url: "tel:" + bussiness?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("../../assets/images/pin.png"),
      url:
        "https://www.google.com/maps/search/?api=1&query=" + bussiness?.address,
    },
    {
      id: 3,
      name: "Web",
      icon: require("../../assets/images/web.png"),
      url: bussiness?.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("../../assets/images/share.png"),
      url: bussiness?.website,
    },
  ];

  const onPressHandler = (item) => {
    if (item?.name == "Share") {
      Share.share({
        message:
          bussiness?.name +
          "\n Address: " +
          bussiness?.address +
          "\n Contact: " +
          bussiness?.contact +
          "\n Website: " +
          bussiness?.website +
          "\n Find More Details On Bussiness Directory App",
      });
      return;
    }
    Linking.openURL(item?.url);
  };
  return (
    <View style={styles.mainContainer}>
      <FlatList
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={actionButtonMenu}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() => onPressHandler(item)}>
            <Image source={item?.icon} style={styles.image} />
            <Text style={styles.name}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
      {/* <Text>Actionbutton</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  image: {
    width: 50,
    height: 50,
  },
  name: {
    fontFamily: "outfit-medium",
    textAlign: "center",
    marginTop: 3,
  },
});
