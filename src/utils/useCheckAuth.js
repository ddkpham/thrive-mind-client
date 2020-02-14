// check if session is valid
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../app.module'

const useCheckAuth = () => {
  let isSessionValid = false
  const token = useSelector(({ app }) => app.token)

  // if token does not exist, don't need to check
}
