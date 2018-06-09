import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Fade,
  Grid,
} from '@material-ui/core'


const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 10,
    textAlign: 'center',
  },
})

class Help extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {}
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
        />
      </Fade>
    )
  }
}


export default withStyles(styles)(Help)
