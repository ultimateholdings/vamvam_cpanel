import { Box, Stack, Heading } from "@chakra-ui/react";
import { GoogleMap } from "../../../components/UI";

function DriverVisualization() {

    return (
        <Stack>
            <Heading as={"h2"}>Drivers Location</Heading>
            <Box height={"70lvb"} maxH={"80lvb"}>
                <GoogleMap />
            </Box>
        </Stack>
    );

}

export default DriverVisualization;
