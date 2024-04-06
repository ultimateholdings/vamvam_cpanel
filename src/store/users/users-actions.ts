import { Dispatch } from "redux";
import { getAllUsers } from "../../api/admin/http";
import { uiActions } from "../ui/ui-slice";
import { userActions } from "./user-slice";
import { GetUserArgs } from "../../models/admin/admin";
import { json } from "react-router-dom";

export function fetchUsersList({ skip, pageToken, role }: GetUserArgs) {
  return async (dispatch: Dispatch) => {
    const isInitialReq = !skip && !pageToken && !role;

    try {
      if (isInitialReq) {
        dispatch(userActions.changeLoading(true));
      } else {
        dispatch(uiActions.showLinearLoader(true));
      }

      const { nextPageToken, refreshed, users } = await getAllUsers({
        pageToken,
        role,
        skip,
      });

      if (isInitialReq) {
        dispatch(userActions.changeInitialRequest(true));
      }

      dispatch(
        userActions.changeData({ users, refreshed, pageToken: nextPageToken })
      );
    } catch (error: any) {
      throw json({ message: error.message }, { status: 500 });
    } finally {
      if (isInitialReq) {
        dispatch(userActions.changeLoading(false));
      } else {
        dispatch(uiActions.showLinearLoader(false));
      }
    }
  };
}
