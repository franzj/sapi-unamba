import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'utils/store'
import { withStyles } from '@material-ui/core/styles'
import { Button, Icon, TextField, Typography, Grid, InputAdornment } from '@material-ui/core'


const styles = theme => ({
  btnNext: {
    marginLeft: theme.spacing.unit * 5,
    marginTop: -theme.spacing.unit,
  },
  btnSelectDir: {
    marginTop: theme.spacing.unit * -4,
  },
  dirsInputs: {
    visibility: 'hidden',
  },
  grid: {
    width: '100%',
  },
  icon: {
    fontSize: 32,
    margin: '-6px 12px',
  },
  textField: {
    width: 'calc(100% - 60px)',
  },
})

@connect
@withStyles(styles)
export default class DirsInput extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      searchPDFs: PropTypes.func.isRequired,
      handleNext: PropTypes.func.isRequired,
    }).isRequired,
    state: PropTypes.shape({
      dirs: PropTypes.shape({
        analisys: PropTypes.object.isRequired,
        projects: PropTypes.object.isRequired,
      }).isRequired,
      step: PropTypes.number.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      errorAnalisysDir: false,
      errorProjectsDir: false,
    }

    this.dirProjectsRef = createRef()
    this.dirAnalisysRef = createRef()

    this.onNextStep = this.onNextStep.bind(this)
    this.onSelectDir = this.onSelectDir.bind(this)
  }

  componentDidMount() {
    this.dirProjectsRef.current.webkitdirectory = true
    this.dirAnalisysRef.current.webkitdirectory = true
  }

  onNextStep(event) {
    event.preventDefault()

    const { actions, state: { dirs: { analisys, projects } } } = this.props
    const errorAnalisysDir = analisys.files.length === 0
    const errorProjectsDir = projects.files.length === 0

    if (errorAnalisysDir || errorProjectsDir) {
      this.setState({
        errorAnalisysDir,
        errorProjectsDir,
      })
    } else {
      actions.handleNext()
    }
  }

  onSelectDir(event) {
    try {
      const { searchPDFs } = this.props.actions
      const { files: [dir], attributes: { targetdir } } = event.target

      searchPDFs(dir.path, targetdir.value)
    } catch (error) {
      // Pass
    }
  }

  render() {
    const { classes, state: { dirs: { analisys, projects } } } = this.props
    const { errorAnalisysDir, errorProjectsDir } = this.state

    return (
      <form onSubmit={this.onNextStep}>
        <Grid container spacing={16} alignItems="center" direction="column">
          <Grid item xs={10} className={classes.grid}>
            <Typography align="center" variant="headline" gutterBottom>
              <Icon className={classes.icon}>folder</Icon>
              Configuración de Directorios
              <Button
                size="small"
                type="submit"
                color="primary"
                variant="contained"
                className={classes.btnNext}
              >
                Continuar
                <Icon>arrow_right_alt</Icon>
              </Button>
            </Typography>
          </Grid>
          <Grid item xs={10} className={classes.grid}>
            <TextField
              className={classes.textField}
              error={errorProjectsDir}
              id="dir-projects"
              label="Directorio de banco de proyectos"
              margin="normal"
              value={projects.path}
              helperText={errorProjectsDir
                ? 'Seleccione la carpeta con el banco de proyectos.'
                : null
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>folder</Icon>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              mini
              className={classes.btnSelectDir}
              color="primary"
              variant="fab"
              onClick={() => {
                this.dirProjectsRef.current.click()
              }}
            >
              <Icon>folder_open</Icon>
            </Button>
          </Grid>
          <Grid item xs={10} className={classes.grid}>
            <TextField
              className={classes.textField}
              error={errorAnalisysDir}
              id="dir-analisys"
              label="Directorio de entrada de análisis"
              margin="normal"
              value={analisys.path}
              helperText={errorAnalisysDir
                ? 'Seleccione la carpeta con proyectos a analizar.'
                : null
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>folder</Icon>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              mini
              className={classes.btnSelectDir}
              color="primary"
              variant="fab"
              onClick={() => {
                this.dirAnalisysRef.current.click()
              }}
            >
              <Icon>folder_open</Icon>
            </Button>
          </Grid>

          <input
            type="file"
            targetdir="projects"
            ref={this.dirProjectsRef}
            className={classes.dirsInputs}
            onChange={this.onSelectDir}
          />
          <input
            type="file"
            targetdir="analisys"
            ref={this.dirAnalisysRef}
            className={classes.dirsInputs}
            onChange={this.onSelectDir}
          />
        </Grid>
      </form>
    )
  }
}
