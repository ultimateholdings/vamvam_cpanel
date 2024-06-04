import { Box, Stack, Heading } from "@chakra-ui/react";
import { GoogleMap } from "../../../components/UI";
import {fakeDrivers} from "../../../components/UI/GMap";
import {useTranslation} from "react-i18next";

function DriverVisualization() {
    const {t} = useTranslation();

    return (
        <Stack>
            <Heading as={"h2"}>{t("delivery.map_heading")}</Heading>
            <Box height={"70lvb"} maxH={"80lvb"}>
                <GoogleMap drivers={fakeDrivers}/>
            </Box>
        </Stack>
    );

}

export default DriverVisualization;
