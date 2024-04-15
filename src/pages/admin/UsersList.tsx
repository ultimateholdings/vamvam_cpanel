import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useCallback, useEffect, useState } from "react";
import { fetchUsersList } from "../../store/users/users-actions";
import { userActions } from "../../store/users/user-slice";
import { PAGE_LIMIT } from "../../helper";
import {
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Th,
  Tr,
  Avatar,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { CircularLoader, OverviewTableTyped } from "../../components/UI";
import FilterByRoleInput from "../../components/Users/FilterByRoleInput";
import UserDetailPage from "./UserDetail";
import UserData from "../../models/auth/user-data";
import { getFilePath } from "../../helper/utils";
import { useTranslation } from "react-i18next";

const UsersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData>({} as UserData);
  const {
    initialReqSent,
    users: totalUsers,
    loading,
    prevRole,
    pageToken,
    refreshed,
    currentPage,
  } = useSelector((state: RootState) => state.users);
  const { linearLoaderVisible } = useSelector((state: RootState) => state.ui);
  const displayedUsers = totalUsers.slice(
    PAGE_LIMIT * (currentPage - 1),
    PAGE_LIMIT * currentPage
  );

  const fetchUsers = useCallback(() => {
    dispatch(fetchUsersList({}));
  }, [dispatch]);

  const clearState = useCallback(() => {
    dispatch(userActions.emptyState());
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
    return () => {
      clearState();
    };
  }, [clearState, fetchUsers]);

  function handleRoleChange(role: string) {
    if (role === prevRole) return;
    if (role !== prevRole) {
      dispatch(userActions.changeUsers([]));
    }
    dispatch(userActions.changeRole(role));
    dispatch(fetchUsersList({ role }));
  }

  function handleNextPage() {
    if (linearLoaderVisible) return;
    if (totalUsers.length == PAGE_LIMIT * currentPage) {
      dispatch(
        fetchUsersList({
          pageToken: pageToken,
          role: prevRole,
          skip: refreshed ? totalUsers.length : undefined,
        })
      );
    } else {
      dispatch(userActions.changeCurrentPage(currentPage + 1));
    }
  }

  function handlePreviousPage() {
    if (linearLoaderVisible) return;
    dispatch(userActions.changeCurrentPage(currentPage - 1));
  }

  function handleViewDetails(user: UserData) {
    setIsOpen(true);
    setCurrentUser(user);
  }

  function hideDetailsView() {
    setIsOpen(false);
  }

  const showNext = displayedUsers.length === PAGE_LIMIT;
  const showPrevious = currentPage > 1;
  const tableColumns = [
    t("users.name"),
    t("users.phone"),
    "Email",
    t("users.role"),
    t("users.status"),
  ];

  return loading && !initialReqSent ? (
    <CircularLoader />
  ) : (
    <>
      <UserDetailPage
        isOpen={isOpen}
        onClose={hideDetailsView}
        user={currentUser}
      />
      <OverviewTableTyped
        currentPage={currentPage}
        onNext={showNext ? handleNextPage : undefined}
        onPrevious={showPrevious ? handlePreviousPage : undefined}
        items={totalUsers}
        title={t("users.users_list")}
        headerTrailer={
          <HStack align="end">
             
            <FilterByRoleInput onSelectRole={handleRoleChange} />
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
            {displayedUsers.map((member) => (
              <Tr
                key={member.id}
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
                  </HStack>
                </Td>
                <Td>
                  <Text color="fg.muted">{member.phone}</Text>
                </Td>
                <Td>
                  <Text color="fg.muted">{member.email}</Text>
                </Td>
                <Td>
                  <Text color="fg.muted">{member.role}</Text>
                </Td>
                <Td>
                  <Badge
                    size="sm"
                    colorScheme={member.status === "active" ? "green" : "red"}
                  >
                    {member.status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </OverviewTableTyped>
    </>
  );
};

export default UsersPage;
