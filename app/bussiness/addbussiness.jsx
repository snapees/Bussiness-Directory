import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db, storage } from "../../configs/FirebaseConfig";
import { ScrollView } from "react-native-virtualized-view";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBussiness() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Add New Bussiness",
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
    });
    GetCatedoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri);
    // console.log(result);
  };

  const GetCatedoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  const onAddNewBussiness = async () => {
    setLoading(true);
    const fileName = Date.now().toString() + ".jpg";
    const resp = await fetch(image);
    const blob = await resp.blob();
    const imageRef = ref(storage, "bussiness-app/" + fileName);
    uploadBytes(imageRef, blob)
      .then((snapshot) => {
        ("Image Uploaded!");
      })
      .then((resp) => {
        getDownloadURL(imageRef).then(async (downloadUrl) => {
          // (downloadUrl);
          saveBussinessDetail(downloadUrl);
        });
      });
    setLoading(false);
  };

  const saveBussinessDetail = async (imageUrl) => {
    await setDoc(doc(db, "BussinessList", Date.now().toString()), {
      name: name,
      address: address,
      contact: contact,
      about: about,
      website: website,
      category: category,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      imageUrl: imageUrl,
    });
    setLoading(false);
    ToastAndroid.show("New Bussiness Added Successfully.!", ToastAndroid.LONG);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <Text style={styles.text1}>Add New Bussiness</Text>
      <Text style={styles.text2}>Fill Details To Add New Bussiness</Text>
      <TouchableOpacity style={styles.imageBox} onPress={() => onImagePick()}>
        {!image ? (
          <Image
            style={styles.image}
            source={require("../../assets/images/placeholder.png")}
          />
        ) : (
          <Image style={styles.image} source={{ uri: image }} />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          defaultValue={name}
          onChangeText={(text) => (n = text)}
          onEndEditing={() => setName(n)}
          style={styles.textInput}
          placeholder="Name"
        />
        <TextInput
          defaultValue={address}
          onChangeText={(value) => (n = value)}
          onEndEditing={() => setAddress(n)}
          style={styles.textInput}
          placeholder="Address"
        />
        <TextInput
          defaultValue={contact}
          onChangeText={(value) => (n = value)}
          onEndEditing={() => setContact(n)}
          style={styles.textInput}
          placeholder="Contact"
        />
        <TextInput
          defaultValue={website}
          onChangeText={(value) => (n = value)}
          onEndEditing={() => setWebsite(n)}
          style={styles.textInput}
          placeholder="Website"
        />
        <TextInput
          defaultValue={rating}
          onChangeText={(value) => (n = value)}
          onEndEditing={() => setRating(n)}
          style={styles.textInput}
          placeholder="Rating"
        />
        <TextInput
          defaultValue={about}
          onChangeText={(value) => (n = value)}
          onEndEditing={() => setAbout(n)}
          multiline
          numberOfLines={5}
          style={styles.inputTxt}
          placeholder="About"
        />

        <View style={styles.pickerSelect}>
          <RNPickerSelect
            value={category}
            onValueChange={(value) => setCategory(value)}
            items={categoryList}
          />
        </View>
      </View>

      <TouchableOpacity
        disabled={loading}
        onPress={() => onAddNewBussiness()}
        style={styles.btn}
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text style={styles.btntxt}>Add New Bussiness</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
  text1: {
    fontFamily: "outfit-bold",
    fontSize: 25,
  },
  text2: {
    fontFamily: "outfit",
    color: Colors.GREY,
  },
  imageBox: {
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 17,
    backgroundColor: Colors.light.background,
    marginTop: 10,
    borderColor: Colors.PRIMARY,
    fontFamily: "outfit",
  },
  inputTxt: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 17,
    backgroundColor: Colors.light.background,
    marginTop: 10,
    borderColor: Colors.PRIMARY,
    fontFamily: "outfit",
    height: 100,
  },
  pickerSelect: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.light.background,
    marginTop: 10,
    borderColor: Colors.PRIMARY,
  },
  btn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 15,
  },
  btntxt: {
    fontFamily: "outfit-medium",
    textAlign: "center",
    color: Colors.light.background,
  },
});
