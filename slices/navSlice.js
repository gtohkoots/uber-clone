import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeinformation: null
};

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeinformation: (state, action) => {
            state.travelTimeinformation = action.payload;
        }
    }
})

export const { setOrigin, setDestination, setTravelTimeinformation } = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeinformation = (state) => state.nav.travelTimeinformation;

export default navSlice.reducer;
