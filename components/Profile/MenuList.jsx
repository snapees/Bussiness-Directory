import {
  FlatList,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function MenuList() {
  const { signOut } = useAuth();
  const menuList = [
    {
      id: 1,
      name: "Add Bussiness",
      icon: require("../../assets/images/add.png"),
      path: "/bussiness/addbussiness",
    },
    {
      id: 2,
      name: "My Bussiness",
      icon: require("../../assets/images/business-and-trade.png"),
      // path: "/bussiness/mybussiness",
      path: "",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("../../assets/images/share_1.png"),
      path: "share",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("../../assets/images/logout.png"),
      path: "logout",
    },
  ];

  const router = useRouter();

  const onMenuClick = (item) => {
    if (item.path == "logout") {
      signOut();
      return;
    }
    if (item.path == "share") {
      Share.share({
        message: "Download the bussiness directory app...! Download URL: ",
      });
      return;
    }
    router.push(item.path);
  };
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            key={index}
            style={styles.container}
          >
            <Image source={item?.icon} style={styles.image} />
            <Text style={styles.name}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.txtbottom}>Develped By Amit Thakur @ 2024</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 50,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    margin: 10,
    backgroundColor: Colors.light.background,
    borderColor: Colors.PRIMARY,
  },
  image: {
    width: 50,
    height: 50,
  },
  name: {
    fontFamily: "outfit-medium",
    fontSize: 16,
    flex: 1,
  },
  txtbottom: {
    fontFamily: "outfit",
    textAlign: "center",
    marginTop: 165,
    color: Colors.GREY,
  },
});
