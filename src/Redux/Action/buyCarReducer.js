import { CLEAR_SELECT_CAR, SET_SELECT_CAR } from "../buyCar";

export const setSelectedCar = (carId) => ({
  type: SET_SELECT_CAR,
  payload: { carId },
});

export const clearSelectedCar = () => ({
  type: CLEAR_SELECT_CAR,
});
