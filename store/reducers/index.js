// third-party
import { combineReducers } from "redux";

// project import
import plan from "../slices/stepSlice";
import auth from "../slices/authSlice";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ plan, auth });

export default reducers;
