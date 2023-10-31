import { combineReducers } from "redux";
import { PayReducer } from "./payReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    pay: PayReducer,
})