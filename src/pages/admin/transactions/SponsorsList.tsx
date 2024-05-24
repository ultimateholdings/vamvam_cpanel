import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { useCallback, useEffect, useState } from "react";
import { fetchTransactionsList } from "../../../store/transactions/transactions-actions";
import { transactionActions } from "../../../store/transactions/transaction-slice";
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
  Avatar
} from "@chakra-ui/react";
import { CircularLoader, OverviewTableTyped } from "../../../components/UI";
import TransactionData from "../../../models/transactions/transaction-data";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getFilePath } from "../../../helper/utils";
import FilterByDateInput from "../../../components/Users/FilterByDateInput";

const TransactionsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const {
    initialReqSent,
    transactions: totalTransactions,
    loading,
    pageToken,
    refreshed,
    currentPage,
  } = useSelector((state: RootState) => state.transactions);
  const { linearLoaderVisible } = useSelector((state: RootState) => state.ui);
  const displayedTransactions = totalTransactions.slice(
    PAGE_LIMIT * (currentPage - 1),
    PAGE_LIMIT * currentPage
  );

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');



  const fetchTransactions = useCallback(() => {
    dispatch(fetchTransactionsList({}));
  }, [dispatch]);

  const clearState = useCallback(() => {
    dispatch(transactionActions.emptyState());
  }, [dispatch]);

  useEffect(() => {
    fetchTransactions();
    return () => {
      clearState();
    };
  }, [clearState, fetchTransactions]);

  const navigate = useNavigate();

  function handleNextPage() {
    if (linearLoaderVisible) return;
    if (totalTransactions.length == PAGE_LIMIT * currentPage) {
      dispatch(
        fetchTransactionsList({
          pageToken: pageToken,
          skip: refreshed ? totalTransactions.length : undefined,
        })
      );
    } else {
      dispatch(transactionActions.changeCurrentPage(currentPage + 1));
    }
  }

  function handlePreviousPage() {
    if (linearLoaderVisible) return;
    dispatch(transactionActions.changeCurrentPage(currentPage - 1));
  }

  function handleViewDetails(transaction: TransactionData) {
    return;
    navigate('/admin/transaction/'+transaction.id)
  }

  const handleStartDateChange = (value:string) => {
    setStartDate(value);
  }


  const handleEndtDateChange = (value:string) => { 
    setEndDate(value);
    
  }

  const sendFilters = ()=> dispatch(fetchTransactionsList({startDate, endDate}));

  const showNext = displayedTransactions.length === PAGE_LIMIT;
  const showPrevious = currentPage > 1;
  const tableColumns = [
    t("transaction.avatar"),
    t("transaction.bonus"),
    t("transaction.amount"),
    t("transaction.date"),
    t("transaction.point"),
  ];

  return loading && !initialReqSent ? (
    <CircularLoader />
  ) : (
    <>
      <OverviewTableTyped
        currentPage={currentPage}
        onNext={showNext ? handleNextPage : undefined}
        onPrevious={showPrevious ? handlePreviousPage : undefined}
        items={totalTransactions}
        title={t("transaction.transactions_list")}
        headerTrailer={
          <HStack align="end">
            <FilterByDateInput onSelectDate={handleStartDateChange} title={"Debut"} value={startDate}/>
            <FilterByDateInput onSelectDate={handleEndtDateChange} title={"Fin"} value={endDate}/>
            <button
              onClick={() => sendFilters()}
              className="px-8 py-2 mt-4 cursor-pointer rounded-lg border border-primary bg-primary"
            >
              valider
            </button>
          </HStack>
        }
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
            {displayedTransactions.map((member) => (
              <Tr
                key={member?.id}
                _hover={{ cursor: "pointer" }}
                onClick={() => handleViewDetails(member)}
              >
                <Td>
                <HStack spacing="3">
                    <Avatar
                      src={getFilePath(member.avatar as string)}
                      boxSize="10"
                    />
                    <Text fontWeight="medium">{member.firstName}</Text>
                    <Text fontWeight="medium">{member.lastName}</Text>
                  </HStack>
                </Td>
                <Td>
                  <Text color="fg.muted">{member?.bonus}</Text>
                </Td>
                <Td>
                  <Text color="fg.muted">{member?.amount}</Text>
                </Td>
                <Td>
                  <Text color="fg.muted">{member?.date}</Text>
                </Td>
                <Td>
                  <Text color="fg.muted">{member?.firstName}</Text>
                </Td>
                <Td>
                  <Text color="fg.muted">{member?.point}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </OverviewTableTyped>
    </>
  );
};

export default TransactionsPage;
