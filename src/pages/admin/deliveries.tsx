import { Stack } from "@chakra-ui/react";
import { DefaultBuilder, OverviewTable } from "../../components/UI";
import { members } from "../../components/UI/data.tsx";

const deliveryColumn = ["name", "status", "email", "role"];
function Deliveries() {
    return (
        <Stack>
            <OverviewTable title="Delivery List" headerNames={deliveryColumn} itemBuilder={DefaultBuilder} items={members} />
        </Stack>
    );
}

export default Deliveries;

