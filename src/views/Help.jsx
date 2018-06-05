import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {
  Fade,
  Grid
} from '@material-ui/core'


const styles = (theme) => ({
  'root': {
    'paddingTop': theme.spacing.unit * 10,
    'textAlign': 'center'
  }
})

class Help extends Component {
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
        </Grid>
      </Fade>
    )
  }
}


Help.propTypes = {'classes': PropTypes.object.isRequired}

export default withStyles(styles)(Help)
