import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'utils/store'
import { withStyles } from '@material-ui/core/styles'
import {
  Button, Icon, TextField, Typography, Grid, InputAdornment,
} from '@material-ui/core'

const styles = theme => ({
  root: {
    padding: `0 ${theme.spacing.unit * 4}px`,
  },
  icon: {
    fontSize: 32,
    margin: '0 6px -6px 0',
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
        analysis: PropTypes.object.isRequired,
        projects: PropTypes.object.isRequired,
      }).isRequired,
      step: PropTypes.number.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      errorAnalysisDir: false,
      errorProjectsDir: false,
    }

    this.dirProjectsRef = createRef()
    this.dirAnalysisRef = createRef()
  }

  componentDidMount() {
    this.dirProjectsRef.current.webkitdirectory = true
    this.dirAnalysisRef.current.webkitdirectory = true
  }

  onNextStep = () => {
    const {
      actions,
      state: {
        dirs: { analysis, projects },
      },
    } = this.props
    const errorAnalysisDir = analysis.files.length === 0
    const errorProjectsDir = projects.files.length === 0

    if (errorAnalysisDir || errorProjectsDir) {
      this.setState({
        errorAnalysisDir,
        errorProjectsDir,
      })
    } else {
      actions.handleNext()
    }
  }

  onSelectDir = (event) => {
    try {
      const { searchPDFs } = this.props.actions
      const {
        files: [dir],
        attributes: { targetdir },
      } = event.target

      searchPDFs(dir.path, targetdir.value)
    } catch (error) {
      // Pass
    }
  }

  render() {
    const {
      classes,
      state: {
        dirs: { analysis, projects },
      },
    } = this.props
    const { errorAnalysisDir, errorProjectsDir } = this.state

    return (
      <Grid container spacing={24} direction="column" className={classes.root}>
        <Grid item>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="headline">
                <Icon className={classes.icon}>
                  folder
                </Icon>
                Configuración de Directorios
              </Typography>
            </Grid>
            <Grid item>
              <Button size="small" color="primary" variant="contained" onClick={this.onNextStep}>
                Continuar
                <Icon>
                  arrow_forward
                </Icon>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" justify="space-between">
            <Grid item sm={11}>
              <TextField
                fullWidth
                error={errorProjectsDir}
                id="dir-projects"
                label="Directorio de banco de proyectos"
                margin="normal"
                value={projects.path}
                helperText={
                  errorProjectsDir ? 'Seleccione la carpeta con el banco de proyectos.' : null
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>
                        folder
                      </Icon>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={1}>
              <Button
                mini
                color="primary"
                variant="fab"
                onClick={() => {
                  this.dirProjectsRef.current.click()
                }}
              >
                <Icon>
                  folder_open
                </Icon>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" justify="space-between">
            <Grid item sm={11}>
              <TextField
                fullWidth
                error={errorAnalysisDir}
                id="dir-analisys"
                label="Directorio de entrada de análisis"
                margin="normal"
                value={analysis.path}
                helperText={
                  errorAnalysisDir ? 'Seleccione la carpeta con proyectos a analizar.' : null
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>
                        folder
                      </Icon>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={1}>
              <Button
                mini
                color="primary"
                variant="fab"
                onClick={() => {
                  this.dirAnalysisRef.current.click()
                }}
              >
                <Icon>
                  folder_open
                </Icon>
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <input
          hidden
          type="file"
          targetdir="projects"
          ref={this.dirProjectsRef}
          onChange={this.onSelectDir}
        />
        <input
          hidden
          type="file"
          targetdir="analysis"
          ref={this.dirAnalysisRef}
          onChange={this.onSelectDir}
        />
      </Grid>
    )
  }
}
