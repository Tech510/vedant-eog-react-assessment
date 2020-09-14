import { 
    createStore, 
    applyMiddleware, 
    combineReducers 
  } from "redux";
  import { composeWithDevTools } from "redux-devtools-extension";
  import createSagaMiddleware from "redux-saga";
  import sagas from "./sagas";
  import weatherReducer from "./reducers/Weather";
  import dataReducer from "./reducers/Data"
  
  export default () => {
    const rootReducer = combineReducers({
      weather: weatherReducer,
      data: dataReducer
    });
  
    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = applyMiddleware(sagaMiddleware);
    const store = createStore(rootReducer, composeEnhancers(middlewares));
  
    sagas.forEach(sagaMiddleware.run);
  
    return store;
  };