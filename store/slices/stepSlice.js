import { createSlice } from "@reduxjs/toolkit";

const initailState = {
  step: 0,
  plans: {},
};

const plan = createSlice({
  name: "plan",
  initialState: initailState,
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
    },
    setPlans(state, action) {
      state.plans = action.payload;
    },
  },
});

export const planActions = plan.actions;

export default plan.reducer;
