import fetch from "./utils/fetch";
import useFetch from "./utils/useFetch";
import { Auth } from "aws-amplify";
// ------------------------------------
// Constants
// ------------------------------------
const SIGNIN_REQUEST = "SIGNIN_REQUEST";
const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
const SIGNIN_ERROR = "SIGNIN_ERROR";

const AUTHENTICATE_REQUEST = "AUTHENTICATE_REQUEST";
const AUTHENTICATE_SUCCESS = "AUTHENTICATE_SUCCESS";
const AUTHENTICATE_ERROR = "AUTHENTICATE_ERROR";

const SIGNUP_REQUEST = "SIGNUP_REQUEST";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_ERROR = "SIGNUP_ERROR";

const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";

const GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST";
const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
const GET_PROFILE_ERROR = "GET_PROFILE_ERROR";

const SAVE_USERNAME_FOR_VERIFICATION = 'SAVE_USERNAME_FOR_VERIFICATION'

const initialState = {
  signingIn: false,
  signingUp: false,
  loadingProfile: false,
  authenticating: false,
  user: null,
  token: null,
};

// ------------------------------------
// Actions
// ------------------------------------

const signInRequest = () => ({
  type: SIGNIN_REQUEST
});

const signInSuccess = token => ({
  type: SIGNIN_SUCCESS,
  token
});

const signInError = () => ({
  type: SIGNIN_ERROR
});

const authenticateRequest = () => ({
  type: AUTHENTICATE_REQUEST
});

const authenticateSuccess = token => ({
  type: AUTHENTICATE_SUCCESS,
  token
});

const authenticateError = () => ({
  type: AUTHENTICATE_ERROR
});

const signUpRequest = () => ({
  type: SIGNUP_REQUEST
});

const signUpSuccess = () => ({
  type: SIGNUP_SUCCESS
});

const signUpError = () => ({
  type: SIGNUP_ERROR
});

const getProfileRequest = () => ({
  type: GET_PROFILE_REQUEST
});

const getProfileSuccess = (user) => ({
  type: GET_PROFILE_SUCCESS,
  user,
});

const getProfileError = () => ({
  type: GET_PROFILE_ERROR
});

const saveUsernameForVerification = (username) => ({
  type: SAVE_USERNAME_FOR_VERIFICATION,
  username,
})

const signIn = (username, password) => async dispatch => {
  dispatch(signInRequest());

  try {
    const res = await Auth.signIn(username, password);
    const {
      signInUserSession: {
        idToken: { jwtToken: token }
      }
    } = res;

    dispatch(signInSuccess(token));
  } catch (err) {
    dispatch(signInError());
    return err.code
  }
};

const signUp = data => async dispatch => {
  dispatch(signUpRequest());

  try {
    const {
      username,
      password,
      email,
      lastName: family_name,
      firstName: name,
      phone: phone_number,
      isSeeking: is_seeking
    } = data;

    const res = await Auth.signUp({
      username,
      password,
      attributes: {
        email: email,
        family_name: family_name,
        name: name,
        phone_number: `+1${phone_number}`,
        "custom:is_seeking": is_seeking ? "true" : "false"
      }
    });

    if (res.user) {
      dispatch(signUpSuccess());
      return true;
    }

  } catch (err) {
    dispatch(signUpError());
    // localStorage.removeItem("sessionToken");
    console.log(err);
    return false;
  }
};

const authenticate = () => async dispatch => {
  dispatch(authenticateRequest());

  try {
    const session = await Auth.currentSession()
    const user = await Auth.currentAuthenticatedUser()

    if (!session.isValid()) throw new Error("Session expired.");

    dispatch(authenticateSuccess(session.getAccessToken().getJwtToken()));
    dispatch(getProfileSuccess(user.attributes))
  } catch (err) {
    dispatch(authenticateError());
  }
};

const getProfile = () => async dispatch => {
  dispatch(getProfileRequest());

  try {
    const user = await Auth.currentAuthenticatedUser()

    dispatch(getProfileSuccess(user));
  } catch (err) {
    dispatch(getProfileError());
    console.log(err);
  }
};

const signOut = () => dispatch => {
  try {
    Auth.signOut();
    dispatch({ type: SIGNOUT_SUCCESS });
  } catch (err) {
    console.log(err);
  }
};

export const actions = {
  signIn,
  signUp,
  signOut,
  authenticate,
  getProfile,
  saveUsernameForVerification,
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIGNIN_REQUEST]: state => ({
    ...state
  }),
  [SIGNIN_SUCCESS]: (state, { token }) => ({
    ...state,
    token
  }),
  [SIGNIN_ERROR]: state => ({
    ...state,
    token: null
  }),
  [AUTHENTICATE_REQUEST]: state => ({
    ...state,
    authenticating: true
  }),
  [AUTHENTICATE_SUCCESS]: (state, { token }) => ({
    ...state,
    authenticating: false,
    token
  }),
  [AUTHENTICATE_ERROR]: state => ({
    ...state,
    authenticating: false,
    token: null
  }),
  [SIGNUP_REQUEST]: state => ({
    ...state
  }),
  [SIGNUP_SUCCESS]: state => ({
    ...state
  }),
  [SIGNUP_ERROR]: state => ({
    ...state,
    token: null
  }),
  [SIGNOUT_SUCCESS]: state => ({
    ...state,
    token: null
  }),
  [GET_PROFILE_REQUEST]: state => ({
    ...state,
    loadingProfile: true
  }),
  [GET_PROFILE_SUCCESS]: (state, { user }) => ({
    ...state,
    loadingProfile: false,
    user
  }),
  [GET_PROFILE_ERROR]: state => ({
    ...state,
    loadingProfile: false
  }),
  [SAVE_USERNAME_FOR_VERIFICATION]: (state, { username }) => ({
    ...state,
    user: {
      username,
    },
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
