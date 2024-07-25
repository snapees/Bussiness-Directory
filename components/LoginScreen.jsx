import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser.jsx";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/login.png")}
          style={styles.imageContainer}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.textMain}>
          Your Ultimate
          <Text style={styles.textPrimary}>
            {" "}
            Community Bussiness Directory{" "}
          </Text>
          App
        </Text>
        <Text style={styles.textFooter}>
          Find Your Nearby Bussiness & Start Your Own
        </Text>

        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={styles.textBtn}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { display: "flex", alignItems: "center", marginTop: 50 },
  imageContainer: {
    width: 220,
    height: 450,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: "#000",
  },
  textContainer: { backgroundColor: "#fff", padding: 20, marginTop: -20 },
  textMain: { fontSize: 15, fontFamily: "outfit-bold", textAlign: "center" },
  textPrimary: { color: Colors.PRIMARY, fontSize: 20 },
  textFooter: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "outfit-medium",
    marginTop: 15,
    color: Colors.GREY,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 10,
  },
  textBtn: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "outfit-medim",
  },
});
