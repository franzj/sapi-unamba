import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import logo from 'images/logo.png'
import { withStyles } from '@material-ui/core/styles'
import {
  Button, Fade, Grid, Icon, Typography,
} from '@material-ui/core'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 10,
    textAlign: 'center',
  },
})

@withStyles(styles)
class Home extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props

    return (
      <Fade in>
        <Grid
          container
          spacing={32}
          alignItems="center"
          direction="column"
          justify="center"
          className={classes.root}
        >
          <Grid item>
            <img src={logo} alt="logo" />
          </Grid>
          <Grid item>
            <Typography>SAPI</Typography>
          </Grid>
          <Grid item>
            <Button size="large" color="primary" variant="raised" component={Link} to="/process">
              Iniciar proceso
              <Icon>arrow_forward</Icon>
            </Button>
          </Grid>
        </Grid>
      </Fade>
    )
  }
}

export default Home
