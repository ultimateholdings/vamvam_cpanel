import {
    Box,
    Button,
    Stack,
    Heading
} from '@chakra-ui/react'
import sprite from "../../images/icons.svg";
import { DELIVERY_STATUS } from "../../helper/enums.ts";
import { FormEvent } from "react";

const filterOptions = Object.entries(DELIVERY_STATUS).reduce(
    function(acc, [key, val]) {
        if (!key.startsWith("pending")) {
            acc[key] = val;
        }
        return acc;
    },
    Object.create(null)
);
export function Sprite(props: any) {
    return (
        <svg width={props.size ?? 24} height={props.size ?? 24} {...(props.options ?? {})}>
            <title>{props.title}</title>
            <use href={sprite + "#" + props.name} />
        </svg>
    );
}



export function Option(props: any) {
    return (
        <div className="row f-option">
            <span className="no-shrink">
                <input type="checkbox" name={props.name} id={props.id} />
                <Sprite name="checked" options={{ "aria-hidden": true }} />
            </span>
            <label htmlFor={props.id}>{props.name}</label>
        </div>
    );
}

export const OverviewTable = (props: any) => {
    function handleChange(event: FormEvent) {
        let form = event.currentTarget as HTMLFormElement;

        const elements = Array.from(form.elements).filter(
            (el) => (el as HTMLInputElement).checked === true
        ).map((el: any) => el?.name);
        console.log(elements.join(","));
    }
    return (
        <Box
            bg="bg.surface"
            boxShadow={{ base: 'sm', md: 'md' }}
            borderRadius={{ base: 'none', md: 'lg' }}
        >
            <Stack spacing="5">
                <Box px={{ base: '4', md: '6' }} pt="5">
                    <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
                        <Heading as={"h3"} size={"md"} fontWeight="bold" >
                            {props.title}
                        </Heading>

                        <details className="d-filter">
                            <summary className="row" data-icon-suffix data-icon="arrow_down">filter by</summary>
                            <Box as="form" bgColor={"white"} borderRadius={".5rem"} shadow={"sm"} p={4} className="column" onChange={handleChange}>
                                {
                                    Object.entries(filterOptions).map(
                                        function([key, val]) {
                                            return (
                                                <Option key={key} id={key} name={val} />
                                            );
                                        }
                                    )
                                }
                            </Box>
                        </details>
                    </Stack>
                </Box>
                <Box overflowX="auto" minH={"60lvb"} maxH={"80lvb"}>
                    {props.children}
                </Box>
                <div className="segragator box table-actions">
                    <Button colorScheme='default' variant={"ghost"}>Previous</Button>
                    <Button variant={"ghost"}>Next</Button>
                </div>
            </Stack>
        </Box>
    );
};
