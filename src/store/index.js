import configureStoreProd from "./configureStore.prod"
import configureStoreDev from "./configureStore.dev"

let store;

if (process.env.NODE_ENV === 'production') {
    store = configureStoreProd
} else {
    store = configureStoreDev
}

export {store}