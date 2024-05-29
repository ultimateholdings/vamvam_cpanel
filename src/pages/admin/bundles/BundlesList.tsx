import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useCallback, useEffect } from "react";
import { fetchBundlesList } from "../../../store/bundles/bundles-actions";
import { bundleActions } from "../../../store/bundles/bundle-slice";
import { PAGE_LIMIT } from "../../../helper";
import {
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Th,
  Tr,
  HStack,
} from "@chakra-ui/react";
import { CircularLoader, OverviewTableTyped } from "../../../components/UI";
import BundleData from "../../../models/bundles/bundle-data";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BundlesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const {
    initialReqSent,
    bundles: totalBundles,
    loading,
    pageToken,
    refreshed,
    currentPage,
  } = useSelector((state: RootState) => state.bundles);
  const { linearLoaderVisible } = useSelector((state: RootState) => state.ui);
  const displayedBundles = totalBundles.slice(
    PAGE_LIMIT * (currentPage - 1),
    PAGE_LIMIT * currentPage
  );

  const fetchBundles = useCallback(() => {
    dispatch(fetchBundlesList({}));
  }, [dispatch]);

  const clearState = useCallback(() => {
    dispatch(bundleActions.emptyState());
  }, [dispatch]);

  useEffect(() => {
    fetchBundles();
    return () => {
      clearState();
    };
  }, [clearState, fetchBundles]);

  const navigate = useNavigate();

  function handleNextPage() {
    if (linearLoaderVisible) return;
    if (totalBundles.length == PAGE_LIMIT * currentPage) {
      dispatch(
        fetchBundlesList({
          pageToken: pageToken,
          skip: refreshed ? totalBundles.length : undefined,
        })
      );
    } else {
      dispatch(bundleActions.changeCurrentPage(currentPage + 1));
    }
  }

  function handlePreviousPage() {
    if (linearLoaderVisible) return;
    dispatch(bundleActions.changeCurrentPage(currentPage - 1));
  }

  function handleViewDetails(bundle: BundleData) {
    navigate('/admin/edit-bundle',{state:bundle})
  }

  const showNext = displayedBundles.length === PAGE_LIMIT;
  const showPrevious = currentPage > 1;
  const tableColumns = [
    t("bundle.bonus"),
    t("bundle.gainMin"),
    t("bundle.point"),
    t("bundle.price"),
    t("bundle.unitPrice"),
  ];

  return loading && !initialReqSent ? (
    <CircularLoader />
  ) : (
    <>
      <OverviewTableTyped
        currentPage={currentPage}
        onNext={showNext ? handleNextPage : undefined}
        onPrevious={showPrevious ? handlePreviousPage : undefined}
        items={totalBundles}
        title={t("bundle.bundles_list")}
      >
        <Table>
          <Thead>
            <Tr>
              {tableColumns.map((colName: any, index: number) => (
                <Th key={index}>{colName}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {displayedBundles.map((member) => (
              <Tr
                key={member.id}
                _hover={{ cursor: "pointer" }}
                onClick={() => handleViewDetails(member)}
              >
                <Td>
                  <HStack spacing="3">
                    <Text fontWeight="medium">{member.bonus}</Text>
                  </HStack>
                </Td>
                <Td>
                  <Text color="fg.muted">{member.gainMin}</Text>
                </Td>
                <Td>
                  <Text color="fg.muted">{member.point}</Text>
                </Td>
                <Td>
                  <Text color="fg.muted">{member.price}</Text>
                </Td>
                <Td>
                  <Text color="fg.muted">{member.unitPrice}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </OverviewTableTyped>
    </>
  );
};

export default BundlesPage;
