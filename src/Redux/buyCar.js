export const SET_SELECT_CAR = "SET_SELECT_CAR";
export const CLEAR_SELECT_CAR = "CLEAR_SELECT_CAR";

const initialState = {
  carId: null,
};

export const setSelectedCar = (carId) => ({
  type: SET_SELECT_CAR,
  payload: { carId },
});

export const clearSelectedCar = () => ({
  type: CLEAR_SELECT_CAR,
});

export default function selectedCar(state = initialState, action) {
  switch (action.type) {
    case SET_SELECT_CAR:
      return {
        ...state,
        carId: action.payload.carId,
      };
    case CLEAR_SELECT_CAR:
      return initialState;
    default:
      return state;
  }
}
