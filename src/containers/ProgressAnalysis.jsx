import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'


const styles = (theme) => ({
  'root': {
    'paddingTop': theme.spacing.unit * 5,
    'textAlign': 'center'
  }
})

class ProgressAnalysis extends Component {
  render () {
    const {classes} = this.props

    return (
      <Fragment>
        directorios
      </Fragment>
    )
  }
}


ProgressAnalysis.propTypes = {'classes': PropTypes.object.isRequired}

export default withStyles(styles)(ProgressAnalysis)
