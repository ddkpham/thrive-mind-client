// wraps the fetch API to handle the correct API endpoint
export default (url, options) => fetch(`${process.env.REACT_APP_API}${url}`, options = { method: 'GET' })
