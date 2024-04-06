import {
    Avatar,
    Badge,
    Box,
    Button,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Thead,
    Th,
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { OverviewTable } from "../../components/UI";
import { AppDispatch, RootState } from "../../store";
import { fetchDeliveries } from "../../store/deliveries/listing.ts";
import { RequestResult, DELIVERY_STATUS, DELIVERY_SCHEME } from "../../helper/enums.ts";
import { useEffect, useState } from "react";
import { DeliveryData } from "../../models/delivery.ts";
import { getFormatter } from "../../helper/utils.ts";

const formatter = getFormatter();
const fullName = (first?: string, last?: string) => ((first ?? "") + " " + (last ?? "")).trim();
const statusMap = Object.assign({}, DELIVERY_STATUS);
const schemeMap = Object.assign({}, DELIVERY_SCHEME);
function UserAvatar(props: any) {
    const name = fullName(props.firstName, props.lastName);
    return (
        <HStack spacing="3">
            <Avatar name={name} src={props.avatar} boxSize="10" />
            <Box>
                <Text fontWeight="medium" casing={"capitalize"}>{fullName(props.firstName, props.lastName)}</Text>
                <Text fontSize={"sm"} color={"fg.muted"}>{props.phone}</Text>
            </Box>
        </HStack>
    );
}

function Location(props: any) {
    return (
        props.address
            ? <Text>{props.address}</Text>
            : <Box>
                <Text fontSize={"sm"}>longitude: {props.longitude}</Text>
                <Text fontSize={"sm"}>latitude: {props.latitude}</Text>
            </Box>
    );
}

function DeliveryDetails(props: any) {
    return (
        <Modal isOpen={props.opened} onClose={props.onClose} size={"xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader><Text casing={"capitalize"}>delivery summary</Text></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <HStack justifyContent={"space-between"}>
                            <Badge p={1.5} borderRadius={".25rem"} colorScheme={schemeMap[props.data.status]}>
                                {statusMap[props.data.status]}
                            </Badge>
                            <Text fontWeight={600} color={"green"}>{formatter.formatCurrency(props.data.price ?? "")}</Text>
                        </HStack>
                        <UserAvatar {...props.data.client} />

                    </Stack>

                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

function MemberTable(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [details, setDetails] = useState({});

    function preview(data: DeliveryData) {
        onOpen();
        setDetails(data);
    }
    return (
        <>
            <DeliveryDetails data={details} opened={isOpen} onClose={onClose} />
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
                    {(props.dataSource ?? []).map((data: DeliveryData) => (
                        <Tr key={data.id}>
                            <Td>
                                <UserAvatar {...data.client} />
                            </Td>
                            <Td>
                                <Badge size="sm" p={1.5} borderRadius={".5rem"} colorScheme={schemeMap[data.status]}>
                                    {statusMap[data.status]}
                                </Badge>
                            </Td>
                            <Td>
                                <Location {...data.departure} />
                            </Td>
                            <Td>
                                <Location {...data.destination} />
                            </Td>
                            <Td><Button onClick={() => preview(data)} variant={"ghost"} colorScheme="teal"><Text casing={"capitalize"}>view details</Text></Button></Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    );
}

function Deliveries() {
    const dispatch = useDispatch<AppDispatch>();
    const state = useSelector((rootState: RootState) => rootState.deliveries);
    const headers = ["client", "status", "departure", "destination", ""];

    useEffect(() => requestDeliveries(), []);

    function requestDeliveries() {
        dispatch(fetchDeliveries());
    }

    return (
        <Stack>
            {
                state.result === RequestResult.resolved
                    ? (
                        <OverviewTable title="delivery list">

                            <MemberTable colNames={headers} dataSource={state.data?.results ?? []} />
                        </OverviewTable>
                    )
                    : (
                        <p>loading...</p>
                    )
            }
        </Stack>
    );
}

export default Deliveries;
