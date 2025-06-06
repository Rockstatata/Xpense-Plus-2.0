import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "@/assets/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (err.errors?.[0]?.code === "form_password_incorrect") {
        setError({ message: "Incorrect password. Please try again." });
      } else if (err.errors?.[0]?.code === "form_identifier_not_found") {
        setError({ message: "Email address not found. Please sign up." });
      } else {
        setError({
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.illustration}
        />
        <Text style={styles.title}>Welcome Back</Text>
        {error && (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={24} color="red" />
            <Text style={styles.errorText}>{error.message}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
          style={[styles.input, error && styles.errorInput]}
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          style={[styles.input, error && styles.errorInput]}
        />
        <TouchableOpacity onPress={onSignInPress} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
            <Text style={styles.linkText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
