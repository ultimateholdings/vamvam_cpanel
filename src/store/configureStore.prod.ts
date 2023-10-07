import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers'

const configureCustomStore = (preloadedState?: any) => {
    const store = configureStore(
        {
            reducer: rootReducer
        }
    );

    return store
}

export default configureCustomStore