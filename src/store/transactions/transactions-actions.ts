import { Dispatch } from "redux";
import { getAllTransactions } from "../../api/admin/http";
import { uiActions } from "../ui/ui-slice";
import { transactionActions } from "./transaction-slice";
import { GetTransactionsArgs } from "../../models/admin/admin";
import { json } from "react-router-dom";

export function fetchTransactionsList({ skip, pageToken}: GetTransactionsArgs) {
  return async (dispatch: Dispatch) => {
    const isInitialReq = !skip && !pageToken;

    try {
      if (isInitialReq) {
        dispatch(transactionActions.changeLoading(true));
      } else {
        dispatch(uiActions.showLinearLoader(true));
      }

      const { nextPageToken, refreshed, transactions } = await getAllTransactions({
        pageToken,
        skip
      });

      if (isInitialReq) {
        dispatch(transactionActions.changeInitialRequest(true));
      }

      dispatch(
        transactionActions.changeData({ transactions, refreshed, pageToken: nextPageToken })
      );
    } catch (error: any) {
      throw json({ message: error.message }, { status: 500 });
    } finally {
      if (isInitialReq) {
        dispatch(transactionActions.changeLoading(false));
      } else {
        dispatch(uiActions.showLinearLoader(false));
      }
    }
  };
}
