import {
    Avatar,
    Badge,
    HStack,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Thead,
    Th,
    Tr,
    Box
} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import { OverviewTable } from "../../components/UI";
import { members } from "../../components/UI/data.tsx";
import {AppDispatch, RootState} from "../../store";
import {RequestResult} from "../../helper/enums.ts";

const deliveryColumn = ["name", "status", "email", "role"];
const dispatch = useDispatch<AppDispatch>();


function MemberTable(props: any) {
    return (
        <Table >
            <Thead>
                <Tr>
                    {(props.colNames ?? []).map((colName: any, index: number) => (
                        <Th key={index}>{colName}</Th>
                    ))
                    }
                </Tr>
            </Thead>
            <Tbody>
                {(props.dataSource ?? []).map((member: any) => (
                    <Tr key={member.id}>
                        <Td>
                            <HStack spacing="3">
                                <Avatar name={member.name} src={member.avatarUrl} boxSize="10" />
                                <Text fontWeight="medium">{member.name}</Text>
                            </HStack>
                        </Td>
                        <Td>
                            <Badge size="sm" colorScheme={member.status === 'active' ? 'green' : 'red'}>
                                {member.status}
                            </Badge>
                        </Td>
                        <Td>
                            <Text color="fg.muted">{member.email}</Text>
                        </Td>
                        <Td>
                            <Text color="fg.muted">{member.role}</Text>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

function Deliveries() {


    function requestDeliveries(params?: string) {

    }

    return (
        <Stack>
            {
                store.getState().deliveries.result === RequestResult.resolved
                ? <OverviewTable title="Deliivery List" items={store.getState().deliveries.data?.results ?? []}> <MemberTable /></OverviewTable>
                : <Box> loading...</Box>
            }
        </Stack>
    );
}

export default Deliveries;

