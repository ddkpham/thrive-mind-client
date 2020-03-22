import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

// middleware
const loggerMiddleware = store => next => action => {
  // console.group(action.type);
  // console.info("dispatching", action);
  let result = next(action);
  // console.log("next state", store.getState());
  // console.groupEnd();
  return result;
};

const round = number => Math.round(number * 100) / 100;
const monitorReducersEnhancer = createStore => (
  reducer,
  initialState,
  enhancer
) => {
  const monitoredReducer = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = round(end - start);
    console.log("reducer process time:", diff);
    return newState;
  };
  return createStore(monitoredReducer, initialState, enhancer);
};

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = compose(
    ...enhancers
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for redux dev tools
  );

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(rootReducer));
  }

  return store;
}
