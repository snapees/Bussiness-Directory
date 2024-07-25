import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import BussinessListCard from "../../components/BussinessList/BussinessListCard";
import { Colors } from "../../constants/Colors";

export default function BussinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [bussinessList, setBussinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
    getBussinessList();
  }, []);

  /**
   *  used to get bussiness list by category
   *
   */

  const getBussinessList = async () => {
    setLoading(true);
    setBussinessList([]);
    const q = query(
      collection(db, "BussinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setBussinessList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  return (
    <View>
      {bussinessList?.length > 0 && loading == false ? (
        <FlatList
          data={bussinessList}
          onRefresh={getBussinessList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BussinessListCard key={index} bussiness={item} />
          )}
        />
      ) : loading ? (
        <ActivityIndicator
          style={styles.indicator}
          size={150}
          color={Colors.GREY}
        />
      ) : (
        <Text style={styles.nobussiness}> No Bussiness Found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    marginTop: "60%",
  },
  nobussiness: {
    fontSize: 60,
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: "red",
    marginTop: "50%",
  },
});
