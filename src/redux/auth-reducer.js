import serverAPI from '../serverAPI/serverAPI';

const SET_AUTH = 'SET_AUTH';

const initialState = {
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      };

    default:
      return state;
  }
};

export const authMe = (isAuth) => ({
  type: SET_AUTH,
  isAuth,
});

export const login = (email, password) => (dispatch) => {
  dispatch(authMe(true));
};

export default authReducer;
