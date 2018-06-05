import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import logo from 'images/logo.png'
import {withStyles} from '@material-ui/core/styles'
import {
  Button,
  Fade,
  Grid,
  Icon,
  Typography
} from '@material-ui/core'


const styles = (theme) => ({
  'root': {
    'paddingTop': theme.spacing.unit * 10,
    'textAlign': 'center'
  }
})

class Home extends Component {
  render () {
    const {classes} = this.props

    return (
      <Fade in={true}>
        <Grid
          container
          spacing={32}
          alignItems="center"
          direction="column"
          justify="center"
          className={classes.root}
        >
          <Grid item>
            <img src={logo} alt="logo"/>
          </Grid>
          <Grid item>
            <Typography>
              SAPI
            </Typography>
          </Grid>
          <Grid item>
            <Button
              size="large"
              color="primary"
              variant="raised"
              component={Link}
              to="/process"
            >
              Iniciar proceso
              <Icon>arrow_right_alt</Icon>
            </Button>
          </Grid>
        </Grid>
      </Fade>
    )
  }
}


Home.propTypes = {'classes': PropTypes.object.isRequired}

export default withStyles(styles)(Home)
