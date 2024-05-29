import { Dispatch } from "redux";
import { getAllBundles } from "../../api/admin/http";
import { uiActions } from "../ui/ui-slice";
import { bundleActions } from "./bundle-slice";
import { GetBundlesArgs } from "../../models/admin/admin";
import { json } from "react-router-dom";

export function fetchBundlesList({ skip, pageToken}: GetBundlesArgs) {
  return async (dispatch: Dispatch) => {
    const isInitialReq = !skip && !pageToken;

    try {
      if (isInitialReq) {
        dispatch(bundleActions.changeLoading(true));
      } else {
        dispatch(uiActions.showLinearLoader(true));
      }

      const { nextPageToken, refreshed, bundles } = await getAllBundles({
        pageToken,
        skip
      });

      if (isInitialReq) {
        dispatch(bundleActions.changeInitialRequest(true));
      }

      dispatch(
        bundleActions.changeData({ bundles, refreshed, pageToken: nextPageToken })
      );
    } catch (error: any) {
      throw json({ message: error.message }, { status: 500 });
    } finally {
      if (isInitialReq) {
        dispatch(bundleActions.changeLoading(false));
      } else {
        dispatch(uiActions.showLinearLoader(false));
      }
    }
  };
}
