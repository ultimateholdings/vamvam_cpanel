import {
    Box,
    Button,
    ButtonGroup,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
} from '@chakra-ui/react'


export const OverviewTable = (props: any) => {
    return (
        <Box
            bg="bg.surface"
            boxShadow={{ base: 'sm', md: 'md' }}
            borderRadius={{ base: 'none', md: 'lg' }}
        >
            <Stack spacing="5">
                <Box px={{ base: '4', md: '6' }} pt="5">
                    <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
                        <Text textStyle="lg" fontWeight="bold" casing={"capitalize"}>
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
                    <ButtonGroup
                        spacing="3"
                        justifyContent="space-between"
                        width={{ base: 'full', md: 'auto' }}
                        variant="ghost"
                    >
                        <Button colorScheme='default'>Previous</Button>
                        <Button>Next</Button>
                    </ButtonGroup>
                </Box>
            </Stack>
        </Box>
    )
};
