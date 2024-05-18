import { Dispatch } from "redux";
import { getAllUserSponsored } from "../../../api/admin/http";
import { uiActions } from "../../ui/ui-slice";
import { usersponsoredActions } from "./user-sponsored-slice";
import { GetUserArgs } from "../../../models/admin/admin";
import { json } from "react-router-dom";

export function fetchUsersSponsoredList({id, skip, pageToken}: GetUserArgs) {
  return async (dispatch: Dispatch) => {
    const isInitialReq = !skip && !pageToken;

    try {
      if (isInitialReq) {
        dispatch(usersponsoredActions.changeLoading(true));
      } else {
        dispatch(uiActions.showLinearLoader(true));
      }

      const { nextPageToken, refreshed, usersSponsored } = await getAllUserSponsored({
        pageToken,
        skip,
        id
      });

      if (isInitialReq) {
        dispatch(usersponsoredActions.changeInitialRequest(true));
      }

      dispatch(
        usersponsoredActions.changeData({ usersSponsored, refreshed, pageToken: nextPageToken })
      );
    } catch (error: any) {
      throw json({ message: error.message }, { status: 500 });
    } finally {
      if (isInitialReq) {
        dispatch(usersponsoredActions.changeLoading(false));
      } else {
        dispatch(uiActions.showLinearLoader(false));
      }
    }
  };
}
