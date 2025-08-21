import { combineReducers } from "redux";
import loginReducer from "../authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import buyCarReducer from "../buyCar";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login","selectedCar"]
};

const rootReducer = combineReducers({
  login: loginReducer,
  selectedCar:buyCarReducer
});

export default persistReducer(persistConfig, rootReducer);
