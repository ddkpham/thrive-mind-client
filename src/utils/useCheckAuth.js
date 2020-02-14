// check if session is valid
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../app.module'

const useCheckAuth = () => {
  const dispatch = useDispatch()
  const token = useSelector(({ app }) => app.token)

  // if token does not exist, don't need to check
  if (!token) return false

  // check token on backend
  try {
    dispatch(actions.authenticate())
  } catch (err) {
    console.log(err)
  }
}
