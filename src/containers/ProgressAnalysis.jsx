import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'utils/store'
import { withStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Icon,
  LinearProgress,
  Typography,
} from '@material-ui/core'


const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 4}px`,
  },
  card: {
    height: 250,
  },
  iconDialog: {
    background: '#eee',
    borderRadius: '50%',
    fontSize: 32,
    padding: 12,
    height: 'unset',
    width: 'max-content',
  },
})

@connect
@withStyles(styles)
export default class ProgressAnalysis extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      handleNext: PropTypes.func.isRequired,
      handleBack: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }

    this.handleCancel = this.handleCancel.bind(this)
  }

  handleCancel() {
    const { actions: { handleBack } } = this.props

    handleBack()
  }

  render() {
    const { actions: { handleNext }, classes } = this.props
    const { open } = this.state

    return (
      <Grid container spacing={24} direction="column" className={classes.root}>
        <Grid item>
          <Grid container justify="space-between">
            <Grid item>
              <Button
                size="small"
                color="secondary"
                variant="contained"
                onClick={() => this.setState({
                  open: true,
                })}
              >
                <Icon>cancel</Icon>
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled
                size="small"
                color="secondary"
                variant="contained"
                onClick={handleNext}
              >
                Ver Reporte
                <Icon>arrow_forward</Icon>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar>
                  <Icon>library_books</Icon>
                </Avatar>
              }
              title="Analizando Archivos"
            />
            <CardContent>
              <Grid container spacing={40} justify="center">
                <Grid item sm={10}>
                  <Grid container spacing={16} justify="center" alignItems="center">
                    <Grid item>
                      <CircularProgress size={32} />
                    </Grid>
                    <Grid item>
                      <Typography align="center" variant="subheading">
                        Analizando # Archivos
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={10}>
                  <LinearProgress variant="determinate" value={10} />
                  <Typography align="center" variant="body1">
                    Accion
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Dialog open={open} disableBackdropClick disableEscapeKeyDown>
            <DialogTitle>
              <Grid container spacing={24} alignItems="center">
                <Grid item>
                  <Icon className={classes.iconDialog} color="secondary">
                    warning
                  </Icon>
                </Grid>
                <Grid item>
                  ¿Estás seguro que deceas cancelar?
                </Grid>
              </Grid>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                Si Acepta todo el avance del análisis culminará.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={() => this.setState({
                  open: false,
                })}
              >
                Cancelar
              </Button>
              <Button onClick={this.handleCancel} color="secondary">
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    )
  }
}
