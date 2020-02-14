// Prevent route access if jwt is not present
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = (props) => {
  const { token } = useSelector(({ app }) => app)

  if (!token) return <Redirect to="/login" />

  return (
    <Route {...props} />
  )
}

export default ProtectedRoute
