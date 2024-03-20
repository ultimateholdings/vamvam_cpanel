import {
    Avatar,
    Badge,
    Box,
    Button,
    ButtonGroup,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Table,
    Text,
    Tbody,
    Td,
    Thead,
    Th,
    Tr,
    useBreakpointValue,
} from '@chakra-ui/react'


const MemberTable = (props: any) => (
    <Table >
        <Thead>
            <Tr>
                {(props.colNames ?? []).map((colName: any) => (
                    <Th>{colName}</Th>
                ))
                }
            </Tr>
        </Thead>
        <Tbody>
            {(props.dataSource ?? []).map(props.dataBuilder)}
        </Tbody>
    </Table>
);

export const DefaultBuilder = (member: any) => (
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
);

export const OverviewTable = (props: any) => {
    const isMobile = useBreakpointValue({ base: true, md: false })
    return (
        <Box
            bg="bg.surface"
            boxShadow={{ base: 'sm', md: 'md' }}
            borderRadius={{ base: 'none', md: 'lg' }}
        >
            <Stack spacing="5">
                <Box px={{ base: '4', md: '6' }} pt="5">
                    <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
                        <Text textStyle="lg" fontWeight="bold">
                            {props.title}
                        </Text>
                        <InputGroup maxW="xs">
                            <InputLeftElement pointerEvents="none">
                            </InputLeftElement>
                            <Input placeholder="Search" />
                        </InputGroup>
                    </Stack>
                </Box>
                <Box overflowX="auto">
                    <MemberTable colNames={props.headerNames} dataSource={props.items} dataBuilder={props.itemBuilder}/>
                </Box>
                <Box px={{ base: '4', md: '6' }} pb="5">
                    <HStack spacing="3" justify="space-between">
                        {!isMobile && (
                            <Text color="fg.muted" textStyle="sm">
                                Showing 1 to 5 of {props.items.length} results
                            </Text>
                        )}
                        <ButtonGroup
                            spacing="3"
                            justifyContent="space-between"
                            width={{ base: 'full', md: 'auto' }}
                            variant="secondary"
                        >
                            <Button>Previous</Button>
                            <Button>Next</Button>
                        </ButtonGroup>
                    </HStack>
                </Box>
            </Stack>
        </Box>
    )
};
