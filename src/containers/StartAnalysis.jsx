import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'utils/store'
import { withStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Icon,
  List,
  ListItemIcon,
  ListItem,
  Typography,
} from '@material-ui/core'

const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 4}px`,
  },
  list: {
    borderBottom: '1px solid #bdbdbd',
    borderTop: '1px solid #bdbdbd',
    height: 140,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  listItem: {
    padding: '0 0 0 12px',
  },
  listIcon: {
    margin: 6,
    fontSize: 16,
  },
  listItemText: {
    fontSize: 12,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 300,
  },
})

@connect
@withStyles(styles)
class StartAnalysis extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      handleNext: PropTypes.func.isRequired,
      handleBack: PropTypes.func.isRequired,
    }).isRequired,
    state: PropTypes.shape({
      dirs: PropTypes.shape({
        analysis: PropTypes.object.isRequired,
        projects: PropTypes.object.isRequired,
      }).isRequired,
      step: PropTypes.number.isRequired,
    }).isRequired,
  }

  render() {
    const {
      classes,
      actions,
      state: {
        dirs: { analysis, projects },
      },
    } = this.props

    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={12} sm={12}>
          <Grid container justify="space-between">
            <Grid item>
              <Button size="small" color="primary" variant="contained" onClick={actions.handleBack}>
                <Icon>arrow_back</Icon>
                Retroceder
              </Button>
            </Grid>
            <Grid item>
              <Button size="small" color="primary" variant="contained" onClick={actions.handleNext}>
                Continuar
                <Icon>arrow_forward</Icon>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader
              avatar={(
                <Avatar aria-label="Recipe">
                  <Icon>folder</Icon>
                </Avatar>
)}
              title="Banco de Proyectos Carpeta"
              subheader={projects.path}
            />
            <CardContent>
              <Typography variant="title">Lista de Archivos PDFs</Typography>
              <List className={classes.list}>
                {projects.files.map(file => (
                  <ListItem key={file} className={classes.listItem}>
                    <ListItemIcon>
                      <Icon className={classes.listIcon}>folder</Icon>
                    </ListItemIcon>
                    <span className={classes.listItemText}>{file}</span>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader
              avatar={(
                <Avatar aria-label="Recipe">
                  <Icon>folder</Icon>
                </Avatar>
)}
              title="Carpeta a Analizar Proyectos"
              subheader={analysis.path}
            />
            <CardContent>
              <Typography variant="title">Lista de Archivos PDFs</Typography>
              <List className={classes.list}>
                {analysis.files.map(file => (
                  <ListItem key={file} className={classes.listItem}>
                    <ListItemIcon>
                      <Icon className={classes.listIcon}>folder</Icon>
                    </ListItemIcon>
                    <span className={classes.listItemText}>{file}</span>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default StartAnalysis
