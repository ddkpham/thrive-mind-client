// wraps the fetch API to handle the correct API endpoint
export default (url, options = { method: 'GET' }) => fetch(`${process.env.REACT_APP_API}${url}`, options)
