import { Dispatch } from 'redux';
import { getUserInfo } from '../../api/auth/http';
import { profileActions } from './profile-slice';
import toast from 'react-hot-toast';

export function fetchUserData() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(profileActions.changeIsLoading());
      const userData = await getUserInfo();
      dispatch(profileActions.changeUserData({ userData }));
    } catch (error: any) {
      toast.error(error.message);
      dispatch(profileActions.changeError({ error }));
    }
  };
}
