import { Dispatch } from "redux";
import { uiActions } from "../../ui/ui-slice";
import { json } from "react-router-dom";
import { GetRegistrationArgs } from "../../../models/registrations/registration-args";
import { getSettledRegistrations } from "../../../api/registration/http";
import { settledRegistrationActions } from "./slice";

export function fetchSettledRegistrations({
  skip,
  pageToken,
  name,
  status,
  from,
  to,
}: GetRegistrationArgs) {
  return async (dispatch: Dispatch) => {
    const isInitialReq =
      !skip && !pageToken && !name && !status && !from && !to;

    try {
      if (isInitialReq) {
        dispatch(settledRegistrationActions.changeLoading(true));
      } else {
        dispatch(uiActions.showLinearLoader(true));
      }

      const { nextPageToken, refreshed, registrations } =
        await getSettledRegistrations({
          pageToken,
          name,
          skip,
          status,
          from,
          to,
        });

      if (isInitialReq) {
        dispatch(settledRegistrationActions.changeInitialRequest(true));
      }

      dispatch(
        settledRegistrationActions.changeData({
          settledRegistrations: registrations,
          refreshed,
          pageToken: nextPageToken,
        })
      );
    } catch (error: any) {
      throw json({ message: error.message }, { status: 500 });
    } finally {
      if (isInitialReq) {
        dispatch(settledRegistrationActions.changeLoading(false));
      } else {
        dispatch(uiActions.showLinearLoader(false));
      }
    }
  };
}
