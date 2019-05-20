import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'
import rootReducers from '../_reducers';

import { composeWithDevTools } from 'redux-devtools-extension';

// const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducers, composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            // loggerMiddleware
        )
    )
)