import { useState, useCallback } from "react";
import { Alert } from "react-native";
import Constants from "expo-constants";


export const useTransactions = (userId) => {
    const API_URL = Constants.expoConfig.extra.API_URL;
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState(
        {
            balance: 0,
            income: 0,
            expenses: 0,
        },
    );
    const [loading, setLoading] = useState(true);

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`, {
                method: 'GET',
            });
            const data = await response.json();
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }, [userId]);

    const fetchSummary = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`, {
                method: 'GET',
            });
            const data = await response.json();
            setSummary(data);
        } catch (error) {
            console.error("Error fetching Summary:", error);
        }
    }, [userId]);

    const loadData = useCallback(async () => {
        if (!userId) return;
        setLoading(true);
        try {
            await Promise.all([fetchTransactions(), fetchSummary()]);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    }, [fetchTransactions, fetchSummary, userId]);

    const deleteTransaction = async (id) => {
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete transaction');
            }
            Alert.alert("Success", "Transaction deleted successfully");
            await loadData();
        } catch (error) {
            console.error("Error deleting transaction:", error);
            Alert.alert("Error", "Failed to delete transaction");
        }
    };

    return {
        transactions,
        summary,
        loading,
        loadData,
        deleteTransaction,
    };
};