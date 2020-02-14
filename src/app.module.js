import fetch from './utils/fetch'
import useFetch from './utils/useFetch'
// ------------------------------------
// Constants
// ------------------------------------
const SIGNIN_REQUEST = 'SIGNIN_REQUEST'
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
const SIGNIN_ERROR = 'SIGNIN_ERROR'

const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST'
const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
const AUTHENTICATE_ERROR = 'AUTHENTICATE_ERROR'

const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_ERROR = 'SIGNUP_ERROR'

const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS'

const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST'
const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR'

const initialState = {
  signingIn: false,
  signingUp: false,
  loadingProfile: false,
  authenticating: false,
  user: null,
  token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1ODE2NTIwNDR9.IeNhs6-QP5DGzSAkkx2W3kIwWU-k8gIKwxVaII0IIUA",
}

// ------------------------------------
// Actions
// ------------------------------------

const signInRequest = () => ({
  type: SIGNIN_REQUEST,
})

const signInSuccess = token => ({
  type: SIGNIN_SUCCESS,
  token,
})

const signInError = () => ({
  type: SIGNIN_ERROR,
})

const authenticateRequest = () => ({
  type: AUTHENTICATE_REQUEST,
})

const authenticateSuccess = token => ({
  type: AUTHENTICATE_SUCCESS,
  token,
})

const authenticateError = () => ({
  type: AUTHENTICATE_ERROR,
})

const signUpRequest = () => ({
  type: SIGNUP_REQUEST,
})

const signUpSuccess = () => ({
  type: SIGNUP_SUCCESS,
})

const signUpError = () => ({
  type: SIGNUP_ERROR,
})

const getProfileRequest = () => ({
  type: GET_PROFILE_REQUEST,
})

const getProfileSuccess = () => ({
  type: GET_PROFILE_SUCCESS,
})

const getProfileError = () => ({
  type: GET_PROFILE_ERROR,
})

const signIn = (username, password) => async (dispatch) => {
  dispatch(signInRequest())

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: username,
        user_password: password,
      })
    })

    if (res.ok) {
      const { token } = await res.json()

      // add token to localStorage
      localStorage.setItem('sessionToken', token)
      dispatch(signInSuccess(token))
    }
  } catch (err) {
    dispatch(signInError())
    localStorage.removeItem('sessionToken')
    console.log(err)
  }
}

const signUp = (data) => async (dispatch) => {
  dispatch(signUpRequest())

  try {
    const res = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: data.username,
        user_password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        email_address: data.email,
        phone: data.phone,
        role: data.role,
        is_seeking: data.isSeeking,
      })
    })

    if (res.ok) {
      dispatch(signUpSuccess())
      return true
    }
  } catch (err) {
    dispatch(signUpError())
    localStorage.removeItem('sessionToken')
    console.log(err)
    return false
  }
}

const authenticate = () => async (dispatch) => {
  // const authFetch = useFetch()
  dispatch(authenticateRequest())

  const sessionToken = localStorage.getItem('sessionToken')

  try {
    if (!sessionToken) throw new Error('Session expired.')

    // const res = await authFetch('/protected')
    // console.log(await res.json())
    dispatch(authenticateSuccess(sessionToken))
  } catch (err) {
    dispatch(authenticateError())
    localStorage.removeItem('sessionToken')
    console.log(err)
  }
}

const getProfile = () => async (dispatch) => {
  const authFetch = useFetch()
  dispatch(getProfileRequest())

  try {
    const res = await authFetch('/profile')
    const user = res.json()

    dispatch(getProfileSuccess(user))
  } catch (err) {
    dispatch(getProfileError())
    console.log(err)
  }
}

const signOut = () => (dispatch) => {
  try {
    localStorage.removeItem('sessionToken')
    dispatch({ type: SIGNOUT_SUCCESS })
  } catch (err) {
    console.log(err)
  }
}

export const actions = {
  signIn,
  signUp,
  signOut,
  authenticate,
  getProfile,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIGNIN_REQUEST]: state => ({
    ...state,
  }),
  [SIGNIN_SUCCESS]: (state, { token }) => ({
    ...state,
    token,
  }),
  [SIGNIN_ERROR]: state => ({
    ...state,
    token: null,
  }),
  [AUTHENTICATE_REQUEST]: state => ({
    ...state,
    authenticating: true,
  }),
  [AUTHENTICATE_SUCCESS]: (state, { token }) => ({
    ...state,
    authenticating: false,
    token,
  }),
  [AUTHENTICATE_ERROR]: state => ({
    ...state,
    authenticating: false,
    token: null,
  }),
  [SIGNUP_REQUEST]: state => ({
    ...state,
  }),
  [SIGNUP_SUCCESS]: state => ({
    ...state,
  }),
  [SIGNUP_ERROR]: state => ({
    ...state,
    token: null,
  }),
  [SIGNOUT_SUCCESS]: state => ({
    ...state,
    token: null,
  }),
  [GET_PROFILE_REQUEST]: state => ({
    ...state,
    loadingProfile: true,
  }),
  [GET_PROFILE_SUCCESS]: (state, { user }) => ({
    ...state,
    loadingProfile: false,
    user,
  }),
  [GET_PROFILE_ERROR]: state => ({
    ...state,
    loadingProfile: false,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
