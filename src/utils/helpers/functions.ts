import { useTranslation } from "react-i18next";
import { ErrorResponseApi } from "../constants/types"



function getResponse(action: any): ErrorResponseApi {
    return JSON.parse(action.error.message).data;
}

function tcustom(errorResponseApi?: ErrorResponseApi) {
    const { t, i18n } = useTranslation();

    if (errorResponseApi) {
        switch (i18n.language) {
            case 'en-US':
                return errorResponseApi.message.en;
            case 'fr-FR':
                return errorResponseApi.message.fr;
            default:
                return errorResponseApi.message.fr;

        }
    }
    return ''
}

export { getResponse, tcustom }