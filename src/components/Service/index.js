import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles({})

const Service = (props) => {
  const classes = useStyles()

  const { name, description, phone, email, is_accepting } = props

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">{name}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
      </CardContent>
    </Card>
  )
}

Service.propTypes = {}
Service.defaultProps = {}

export default Service
