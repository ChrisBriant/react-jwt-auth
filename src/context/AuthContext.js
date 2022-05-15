import createDataContext from './createDataContext';

const defaultState = {
  authed: false,
};

const authReducer = (state,action) => {
  switch(action.type) {
    case 'setAuthed':
      return {...state,authed:action.payload};
    default:
      return defaultState;
  }
};


const setAuthed = dispatch => async (authed) => {
    dispatch({type:'setAuthed', payload: authed});
};

export const {Provider, Context} = createDataContext (
  authReducer,
  {setAuthed},
  {...defaultState}
);