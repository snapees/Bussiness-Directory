import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BussinessDetail/Intro";
import Actionbutton from "../../components/BussinessDetail/Actionbutton";
import About from "../../components/BussinessDetail/About";
import { ScrollView } from "react-native-virtualized-view";
import Reviews from "../../components/BussinessDetail/Reviews";

export default function BussinessDetail() {
  const { bussinessid } = useLocalSearchParams();
  const [bussiness, setBussiness] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetBussinessDetailById();
  }, []);

  /**
   * use to get bussiness details by id
   */
  const GetBussinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "BussinessList", bussinessid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setBussiness({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          style={styles.indicator}
          size={150}
          color={Colors.GREY}
        />
      ) : (
        <View>
          {/* Intro */}
          <Intro bussiness={bussiness} />
          {/* Action Button */}
          <Actionbutton bussiness={bussiness} />
          {/* About Section */}
          <About bussiness={bussiness} />
          {/* Review Section */}
          <Reviews bussiness={bussiness} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  indicator: {
    marginTop: "60%",
  },
});
