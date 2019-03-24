import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer, errorReducer, zipCodeReducer, postReducer } from '../reducers';

const reducers = combineReducers({
    authUser: authReducer,
    error: errorReducer,
    post: postReducer,
    zipCode: zipCodeReducer
});

const initialState = {};

const middleware = [thunk];

const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middleware), 
    )
)

export default store; 