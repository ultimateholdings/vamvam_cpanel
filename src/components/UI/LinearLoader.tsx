import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigation } from 'react-router-dom';
import { RootState } from '../../store';

const LinearLoader = () => {
  const { state } = useNavigation();
  const { linearLoaderVisible } = useSelector((state: RootState) => state.ui);
  const isLoading = state === 'loading' || linearLoaderVisible;

  return isLoading ? <LinearProgress /> : <></>;
};

export default LinearLoader;
