import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { Rating } from "react-native-ratings";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Reviews({ bussiness }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState();
  const { user } = useUser();

  const onSubmit = async () => {
    const docRef = doc(db, "BussinessList", bussiness?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });

    ToastAndroid.show("Comment Added Successfully!", ToastAndroid.BOTTOM);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainText}>Reviews</Text>

      <View>
        <Rating
          showRating={false}
          imageSize={20}
          onFinishRating={(rating) => setRating(rating)}
          style={styles.rating}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => setUserInput(value)}
          placeholder="Write Your Comment"
          numberOfLines={4}
        />
        <TouchableOpacity
          style={styles.button}
          disabled={!userInput}
          onPress={() => onSubmit()}
        >
          <Text style={styles.textbtn}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Display Previous Reviews */}
      <View>
        {bussiness?.reviews?.map((item, index) => (
          <View key={index} style={styles.container}>
            <Image source={{ uri: item?.userImage }} style={styles.image} />
            <View style={styles.item}>
              <Text style={styles.txtNme}>{item.userName}</Text>
              <Rating
                imageSize={12}
                ratingCount={item.rating}
                style={{
                  alignItems: "flex-start",
                }}
              />
              <Text>{item.comment}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  mainText: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  rating: {
    paddingVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.GREY,
    textAlignVertical: "top",
  },
  button: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 10,
  },
  textbtn: {
    fontFamily: "outfit",
    color: Colors.light.background,
    textAlign: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 99,
  },
  item: {
    display: "flex",
    gap: 5,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.GREY,
    marginTop: 10,
    borderRadius: 20,
  },
  txtNme: {
    fontFamily: "outfit-medium",
  },
});
