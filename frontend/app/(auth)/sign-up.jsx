import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { styles } from "@/assets/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/assets/constants/colors";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setError(null);
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        setError({ message: "Email address already exists. Please sign in." });
      } else {
        setError({
          message: "An unexpected error occurred. Please try again.",
        });
      }
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>
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
          style={[styles.verificationInput, error && styles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        <Text style={styles.title}>Create Account</Text>
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
        <TouchableOpacity onPress={onSignUpPress} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
