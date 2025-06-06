import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import {
  Text,
  Touchable,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransactions } from "@/hooks/useTransactions";
import { use, useEffect } from "react";
import PageLoader from "@/components/PageLoader";
import { styles } from "@/assets/styles/home.styles";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/assets/constants/colors";
import { useRouter } from "expo-router";
import BalanceCard from "@/components/BalanceCard";
import TransactionItem from "./TransactionItem";

export default function Page() {
  const { user } = useUser();
  const { transactions, summary, loading, loadData, deleteTransaction } =
    useTransactions(user?.id);

  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [user?.id, loadData]);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTransaction(id),
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.headerLogo}
              contentFit="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/create")}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>
        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={handleDelete} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
