import { Stack } from "expo-router/stack";
import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Layout() {
  const { user } = useUser();

  if (!user) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
