import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";
import { forwardRef, useRef } from "react";
import { useTranslation } from "react-i18next";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface PasswordProps extends InputProps {
  label?: string;
  name?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordProps>(
  (props, ref) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    const mergeRef = useMergeRefs(inputRef, ref);
    const onClickReveal = () => {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    };

    const name = props.name ?? "password";
    const label = props.label ?? t("auth.password");

    return (
      <FormControl isRequired>
        <FormLabel htmlFor="password">{label}</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="text"
              aria-label={isOpen ? "Mask password" : "Reveal password"}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id={name}
            name={name}
            ref={mergeRef}
            type={isOpen ? "text" : "password"}
            autoComplete="current-password"
            required
            {...props}
          />
        </InputGroup>
      </FormControl>
    );
  }
);

PasswordField.displayName = "PasswordField";
