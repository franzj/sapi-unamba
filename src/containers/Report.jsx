import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'


const styles = (theme) => ({
  'root': {
    'paddingTop': theme.spacing.unit * 5,
    'textAlign': 'center'
  }
})

class Report extends Component {
  render () {
    const {classes} = this.props

    return (
      <Fragment>
        directorios
      </Fragment>
    )
  }
}


Report.propTypes = {'classes': PropTypes.object.isRequired}

export default withStyles(styles)(Report)
