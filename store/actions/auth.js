import { AsyncStorage } from 'react-native'

export const LOGOUT = "LOGOUT"
export const AUTHENTICATE = "AUTHENTICATE"

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    // dispatch(setLogoutTimer(expiryTime))
    dispatch({ type: AUTHENTICATE, userId: userId, token: token })
  }
}

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCngPfFt7-u-cmGhsj86-rB-OP9inA411k'
    , {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    })
    if(!response.ok){
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      let message = 'Something went wrong'
      if(errorId === 'EMAIL_EXISTS'){
        message = 'This email already exists'
      }
      throw new Error(message)
    }

    const resData = await response.json()
    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  }
}

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCngPfFt7-u-cmGhsj86-rB-OP9inA411k'
    , {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    })
    if(!response.ok){
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      let message = 'Something went wrong'
      if(errorId === 'EMAIL_NOT_FOUND'){
        message = 'This email is not valid'
      } else if(errorId === 'INVALID_PASSWORD'){
        message = 'Password is incorrect'
      }
      throw new Error(message)
    }

    const resData = await response.json()
    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  }
}

export const logout = () => {
  // clearLogoutTimer()
  AsyncStorage.removeItem('userData')
  return { type: LOGOUT }
}

// const clearLogoutTimer = () => {
//   if(timer){
//     clearTimeout(timer)
//   }
// }

// const setLogoutTimer = expirationTime => {
//   return dispatch => {
//     timer = setTimeout(() => {
//       dispatch(logout())
//     }, expirationTime / 1000)
//   }
// }

//Storing data on the harddrive to be able to have ato login
const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    expiryDate: expirationDate.toISOString()
  }))
}