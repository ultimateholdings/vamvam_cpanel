import { Logo } from "./Logo.tsx";
import CircularLoader from "./CircularLoader.tsx";
import DarkModeSwitcher from "./DarkModeSwitcher.tsx";
import * as Icons from "./ProviderIcons.tsx";
import DropdownNotification from "./DropdownNotification.tsx";
import DropdownUser from "./DropdownUser.tsx";
import Layout from "./Layout.tsx";
import LinearLoader from "./LinearLoader.tsx";
import { OAuthButtonGroup } from "./OAuthButtonGroup.tsx";
import { PasswordField } from "./PasswordField.tsx";
import SidebarLinkGroup from "./Sidebar/SidebarLinkGroup.tsx";
import Sidebar from "./Sidebar/Sidebar.tsx";
import LoadingButton from "./LoadingButton.tsx";
import LangSwitcher from "./LangSwitcher.tsx";
import { OverviewTable } from "./overview-table.tsx";
import OverviewTableTyped from "./OverviewTableTyped.tsx";
import sprite from "../../images/icons.svg";

function Sprite(props: any) {
    return (
        <svg width={props.size ?? 24} height={props.size ?? 24} {...(props.options ?? {})}>
            <title>{props.title}</title>
            <use href={sprite + "#" + props.name} />
        </svg>
    );
}

export {
    LoadingButton,
    CircularLoader,
    DarkModeSwitcher,
    DropdownNotification,
    DropdownUser,
    Icons,
    Layout,
    LinearLoader,
    Logo,
    OAuthButtonGroup,
    PasswordField,
    Sidebar,
    LangSwitcher,
    SidebarLinkGroup,
    Sprite,
    OverviewTable,
    OverviewTableTyped,
};
