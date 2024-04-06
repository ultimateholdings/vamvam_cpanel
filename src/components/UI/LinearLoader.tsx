import { useSelector } from "react-redux";
import { useNavigation } from "react-router-dom";
import { RootState } from "../../store";
import { Progress } from "@chakra-ui/react";

const LinearLoader = () => {
  const { state } = useNavigation();
  const { linearLoaderVisible } = useSelector((state: RootState) => state.ui);
  const isLoading = state === "loading" || linearLoaderVisible;

  return isLoading ? <Progress height="2px" isIndeterminate /> : <></>;
};

export default LinearLoader;
