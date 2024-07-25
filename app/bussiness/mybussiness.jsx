import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import BussinessListCard from "../../components/Explore/BussinessListCard";
import { Colors } from "../../constants/Colors";

export default function MyBussiness() {
  const { user } = useUser();
  const [bussinessList, setBussinessList] = useState([]);

  useEffect(() => {
    user && GetUserBussiness();
  }, [user]);

  /**
   * Used to get business list by user email
   */
  const GetUserBussiness = async () => {
    setBussinessList([]);
    const q = query(
      collection(db, "BussinessList"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setBussinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };
  return (
    <View style={styles.maincontainer}>
      <Text style={styles.txtcontainer}>My Bussiness</Text>
      {bussinessList.length > 0 && (
        <FlatList
          style={styles.flatContainer}
          data={bussinessList}
          horizontal={true}
          renderItem={({ item, index }) => {
            <BussinessListCard key={index} bussiness={item} />;
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    padding: 20,
  },
  txtcontainer: {
    fontFamily: "outfit-bold",
    fontSize: 30,
  },
  flatContainer: {
    marginLeft: 20,
  },
});
