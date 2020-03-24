import { useSelector } from 'react-redux'

export default () => {
  const { token, user } = useSelector(({ app }) => app)

  return Boolean(token && user)
}
