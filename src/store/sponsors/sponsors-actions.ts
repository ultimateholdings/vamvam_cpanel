import { Dispatch } from "redux";
import { getAllSponsors } from "../../api/admin/http";
import { uiActions } from "../ui/ui-slice";
import { sponsorActions } from "./sponsor-slice";
import { GetSponsorsArgs } from "../../models/admin/admin";
import { json } from "react-router-dom";

export function fetchSponsorsList({ skip, pageToken}: GetSponsorsArgs) {
  return async (dispatch: Dispatch) => {
    const isInitialReq = !skip && !pageToken;

    try {
      if (isInitialReq) {
        dispatch(sponsorActions.changeLoading(true));
      } else {
        dispatch(uiActions.showLinearLoader(true));
      }

      const { nextPageToken, refreshed, sponsors } = await getAllSponsors({
        pageToken,
        skip
      });

      if (isInitialReq) {
        dispatch(sponsorActions.changeInitialRequest(true));
      }

      dispatch(
        sponsorActions.changeData({ sponsors, refreshed, pageToken: nextPageToken })
      );
    } catch (error: any) {
      throw json({ message: error.message }, { status: 500 });
    } finally {
      if (isInitialReq) {
        dispatch(sponsorActions.changeLoading(false));
      } else {
        dispatch(uiActions.showLinearLoader(false));
      }
    }
  };
}
