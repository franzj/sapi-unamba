import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'utils/store'
import { withStyles } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import {
  Button,
  Collapse,
  Grid,
  Icon,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 4}px`,
  },
  reportList: {
    overflowX: 'auto',
    height: 300,
  },
  reportListHeader: {
    alignItems: 'center',
    backgroundColor: purple[500],
    color: 'white',
    display: 'flex',
    position: 'relative',
  },
})

@connect
@withStyles(styles)
class Report extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    state: PropTypes.shape({
      analyzing: PropTypes.shape({
        report: PropTypes.array.isRequired,
      }).isRequired,
    }).isRequired,
  }

  state = {
    isCollapse: this.props.state.analyzing.report.map(() => []),
  }

  render() {
    const { isCollapse } = this.state
    const {
      classes,
      state: {
        analyzing: { report },
      },
    } = this.props

    return (
      <Grid container spacing={24} direction="column" className={classes.root}>
        <Grid item>
          <Grid container justify="space-between">
            <Grid item>
              <Button size="small" variant="contained" component={Link} to="/">
                <Icon>refresh</Icon>
                Reiniciar Análisis
              </Button>
            </Grid>
            <Grid item>
              <Button size="small" color="primary" variant="contained" onClick={() => {}}>
                <Icon>picture_as_pdf</Icon>
                Exportar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.reportList}>
          {report.map((analizedFile, i) => (
            <List
              key={analizedFile.name}
              component="nav"
              subheader={(
                <ListSubheader className={classes.reportListHeader}>
                  <Icon>picture_as_pdf</Icon>
                  {analizedFile.name}
                </ListSubheader>
)}
            >
              {analizedFile.analyzedFiles.map((projectFile, j) => (
                <Fragment key={projectFile.name}>
                  <ListItem
                    button
                    onClick={() => {
                      isCollapse[i][j] = !isCollapse[i][j]
                      this.setState({ isCollapse })
                    }}
                  >
                    <ListItemIcon>
                      <Icon>inbox_icon</Icon>
                    </ListItemIcon>
                    <ListItemText inset primary={projectFile.name} />
                    <Icon>{isCollapse[i][j] ? 'expand_less' : 'expand_more'}</Icon>
                  </ListItem>
                  <Collapse in={isCollapse[i][j]} timeout="auto">
                    <List>
                      {projectFile.similarities.map(text => (
                        <ListItem>
                          <ListItemIcon>
                            <Icon>start_border</Icon>
                          </ListItemIcon>
                          <ListItemText inset primary={text.bestMatch.length} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Fragment>
              ))}
            </List>
          ))}
        </Grid>
      </Grid>
    )
  }
}

export default Report
