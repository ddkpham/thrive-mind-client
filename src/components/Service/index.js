import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

const Service = (props) => {
  const { name, description, phone, email, is_accepting } = props

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">{name}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button>Email</Button>
        <Button>Call</Button>
      </CardActions>
    </Card>
  )
}

Service.propTypes = {}
Service.defaultProps = {}

export default Service
