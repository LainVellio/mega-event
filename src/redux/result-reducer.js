const SET_RESULT = 'SET_RESULT';

const initialState = {
  result: {
    checkbox: [],
    inputs: [],
    selectData: [],
    switch: false,
    isResult: false,
  },
};

const resultReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESULT:
      return {
        ...state,
        result: action.result,
      };

    default:
      return state;
  }
};

export const setResult = (result) => ({
  type: SET_RESULT,
  result,
});

export default resultReducer;
