import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'


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
                    {props.children}
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
