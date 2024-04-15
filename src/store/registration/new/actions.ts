import { Dispatch } from "redux";
import { uiActions } from "../../ui/ui-slice";
import { json } from "react-router-dom";
import { GetRegistrationArgs } from "../../../models/registrations/registration-args";
import { getNewRegistrations } from "../../../api/registration/http";
import { newRegistrationActions } from "./slice";

export function fetchNewRegistrations({
  skip,
  pageToken,
  name,
}: GetRegistrationArgs) {
  return async (dispatch: Dispatch) => {
    const isInitialReq = !skip && !pageToken && !name;

    try {
      if (isInitialReq) {
        dispatch(newRegistrationActions.changeLoading(true));
      } else {
        dispatch(uiActions.showLinearLoader(true));
      }

      const { nextPageToken, refreshed, registrations } =
        await getNewRegistrations({
          pageToken,
          name,
          skip,
        });

      if (isInitialReq) {
        dispatch(newRegistrationActions.changeInitialRequest(true));
      }

      dispatch(
        newRegistrationActions.changeData({
          newRegistrations: registrations,
          refreshed,
          pageToken: nextPageToken,
        })
      );
    } catch (error: any) {
      throw json({ message: error.message }, { status: 500 });
    } finally {
      if (isInitialReq) {
        dispatch(newRegistrationActions.changeLoading(false));
      } else {
        dispatch(uiActions.showLinearLoader(false));
      }
    }
  };
}
