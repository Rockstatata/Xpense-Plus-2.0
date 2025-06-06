import { COLORS } from "@/assets/constants/colors";
import { styles } from "@/assets/styles/home.styles";
import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Alert, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
              // Optionally, redirect to a specific page after signing out
              Linking.openURL("/sign-in");
            } catch (error) {
              console.error("Sign out failed:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      <Ionicons name="log-out-outline" size={24} color={COLORS.text} />
    </TouchableOpacity>
  );
};
