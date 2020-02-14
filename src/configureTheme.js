import { createMuiTheme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

export default () => createMuiTheme({
  palette: {
    primary: {
      main: '#001CF9',
    },
    secondary: {
      main: grey[50],
    },
  },
})
