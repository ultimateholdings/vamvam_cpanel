
let tokenBearer: any;

let getBearerAccessToken = () => tokenBearer;

function setBearerAccessToken(token: string) {
    tokenBearer = token;
}

export { getBearerAccessToken, setBearerAccessToken }