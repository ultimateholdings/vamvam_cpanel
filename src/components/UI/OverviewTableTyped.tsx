import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { PAGE_LIMIT } from "../../helper";
import { useTranslation } from "react-i18next";

type Props = {
  onPrevious?: VoidFunction;
  onNext?: VoidFunction;
  children?: React.ReactNode;
  headerTrailer?: React.ReactNode;
  currentPage: number;
  items: any[];
  title: string;
  pageSize?: number;
};

const OverviewTableTyped: FC<Props> = (props) => {
  const { t } = useTranslation();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const currentPage = props.currentPage;
  const totalItemLength = props.items.length;
  const pageSize = props.pageSize ?? PAGE_LIMIT;
  return (
    <Box
      bg="bg.surface"
      boxShadow={{ base: "sm", md: "md" }}
      borderRadius={{ base: "none", md: "lg" }}
    >
      <Stack spacing="5">
        <Box px={{ base: "4", md: "6" }} pt="5">
          <Stack
            direction={{ base: "column", md: "row" }}
            justify="space-between"
          >
            <Heading size="xl" textAlign="left">
              {props.title}
            </Heading>
            {props.headerTrailer}
          </Stack>
        </Box>
        <Box overflowX="auto" minH={"60lvb"} maxH={"80lvb"}>{props.children}</Box>
        <Box px={{ base: "4", md: "6" }} pb="5">
          <HStack spacing="3" justify="space-between">
            {!isMobile && totalItemLength > 0 && (
              <Text color="fg.muted" textStyle="sm">
                {t("showing")}{" "}
                {currentPage <= 1
                  ? currentPage
                  : Math.min(
                      (currentPage - 1) * pageSize,
                      totalItemLength
                    )}{" "}
                {t("to")} {Math.min(currentPage * pageSize, totalItemLength)}{" "}
                {t("of")} {totalItemLength} {t("result")}
                {totalItemLength > 1 ? "s" : ""}
              </Text>
            )}
            <ButtonGroup
              spacing="3"
              justifyContent="space-between"
              width={{ base: "full", md: "auto" }}
              variant="secondary"
            >
              {props.onPrevious && (
                <Button onClick={props.onPrevious}>{t("previous")}</Button>
              )}
              {props.onNext && (
                <Button onClick={props.onNext}>{t("next")}</Button>
              )}
            </ButtonGroup>
          </HStack>
        </Box>
      </Stack>
    </Box>
  );
};

export default OverviewTableTyped;
