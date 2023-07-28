import { NAVBAR_ACTION_TYPES } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { Dispatch } from "redux";
import { RootState } from "../store/store";

export const changeCollapsed =
  (val: Boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch: Dispatch) => {
    dispatch({ type: NAVBAR_ACTION_TYPES.IsCollapsed, payload: { val } });
  };

// export const changeMenuOpen = (val:Boolean) => (dispatch) => {
//   dispatch({ type: NAVBAR_ACTION_TYPES.MenuIsOpen, payload: { val } });
// };
export const changeMenuOpen =
  (val: boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch: Dispatch) => {
    dispatch({ type: NAVBAR_ACTION_TYPES.MenuIsOpen, payload: { val } });
  };
