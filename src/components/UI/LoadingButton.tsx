import { ButtonProps, Button, CircularProgress } from "@chakra-ui/react";
import { FC } from "react";

interface Props extends ButtonProps {
  loading: boolean;
  title: string;
}

const LoadingButton: FC<Props> = ({ loading = false, title, ...props }) => {
  return (
    <Button
      {...props}
      disabled={loading}
      _hover={{ cursor: loading ? "not-allowed" : "pointer" }}
    >
      {loading ? <CircularProgress isIndeterminate size="20px" /> : title}
    </Button>
  );
};

export default LoadingButton;
