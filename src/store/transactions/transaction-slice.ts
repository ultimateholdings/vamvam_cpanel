import { createSlice } from "@reduxjs/toolkit";
import TransactionData from "../../models/transactions/transaction-data";

interface TransactionState {
  transactions: TransactionData[];
  pageToken?: string;
  refreshed: boolean;
  prevType?: string;
  currentPage: number;
  loading: boolean;
  initialReqSent: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  initialReqSent: false,
  refreshed: false,
  currentPage: 0,
  loading: false,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    changeData(state, action) {
      const { transactions, pageToken, refreshed } = action.payload;
      state.pageToken = pageToken;
      state.refreshed = refreshed;

      if (refreshed) {
        const newTransactions = (transactions as TransactionData[]).filter(
          (newTransaction) =>
            state.transactions.findIndex((transaction) => transaction.id === newTransaction.id) === -1
        );
        state.transactions = [...state.transactions, ...newTransactions];
      } else {
        state.transactions = [...state.transactions, ...transactions];
      }
      state.currentPage = state.currentPage + 1;
    },
    changeTypes(state, action) {
      state.prevType = action.payload;
      state.currentPage = 0;
    },
    changeTransactions(state, action) {
      state.transactions = action.payload;
    },
    changeCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    changeInitialRequest(state, action) {
      state.initialReqSent = action.payload;
    },
    changeLoading(state, action) {
      state.loading = action.payload;
    },
    emptyState(state) {
      state.transactions = [];
      state.pageToken = undefined;
      state.refreshed = false;
      state.prevType = undefined;
      state.currentPage = 0;
      state.loading = false;
      state.initialReqSent = false;
    },
  },
});

export const transactionActions = transactionSlice.actions;

export default transactionSlice.reducer;
