import { NAVBAR_ACTION_TYPES } from "../actions/actionTypes";
import { AnyAction } from "redux";
const initialState = {
  collapsed: { val: true },
  menuOpen: { val: false },
};

const NavbarReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case NAVBAR_ACTION_TYPES.IsCollapsed:
      return { ...state, collapsed: action.payload };
    case NAVBAR_ACTION_TYPES.MenuIsOpen:
      return { ...state, menuOpen: action.payload };
    default:
      return state;
  }
};

export default NavbarReducer;
