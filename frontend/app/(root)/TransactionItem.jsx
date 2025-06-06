import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@/assets/constants/colors";
import { styles } from "@/assets/styles/home.styles";
import { formatDate } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";

const CATEGORY_ICONS = {
  "Food & Drink": "fast-food",
  Shopping: "cart",
  Transportation: "car",
  Entertainment: "film",
  "Health & Fitness": "heart",
  Bills: "receipt",
  Salaries: "cash",
  Lifestyle: "home",
  Travel: "airplane",
  Education: "book",
  Other: "ellipsis-horizontal",
};

const TransactionItem = ({ item, onDelete }) => {
  const isIncome = item.type === "income";
  const iconName = CATEGORY_ICONS[item.category] || "ellipsis-horizontal";
  return (
    <View style={styles.transactionCard} key={item.id}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons
            name={iconName}
            size={22}
            color={isIncome ? COLORS.income : COLORS.expense}
          />
        </View>
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionCategory}>{item.category}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              { color: isIncome ? COLORS.income : COLORS.expense },
            ]}
          >
            {isIncome ? "+" : "-"}$
            {Math.abs(parseFloat(item.amount)).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(item.created_at)}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
};

export default TransactionItem;
