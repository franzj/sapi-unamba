import React, {Component, createRef} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'utils/store'
import {blue} from '@material-ui/core/colors'
import {withStyles} from '@material-ui/core/styles'
import {
  Button,
  Icon,
  TextField,
  Typography,
  Grid
} from '@material-ui/core'


const styles = (theme) => ({
  'btnNext': {
    'marginTop': theme.spacing.unit * 5
  },
  'dirsInputs': {
    'visibility': 'hidden'
  },
  'grid': {
    'width': '100%'
  },
  'icon': {
    'fontSize': 32,
    'margin': '-6px 12px'
  },
  'textField': {
    'width': 'calc(100% - 60px)'
  },
  'title': {
    'color': blue[600]
  }
})

class DirsInput extends Component {
  static propTypes = {
    'actions': PropTypes.object.isRequired,
    'classes': PropTypes.object.isRequired,
    'state': PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      'errorAnalisysDir': false,
      'errorProjectsDir': false
    }

    this.dirProjectsRef = createRef()
    this.dirAnalisysRef = createRef()

    this.onSelectDir = this.onSelectDir.bind(this)
  }

  componentDidMount () {
    this.dirProjectsRef.current.webkitdirectory = true
    this.dirAnalisysRef.current.webkitdirectory = true
  }

  onSelectDir (event) {
    try {
      const {searchPDFs} = this.props.actions
      const {files: [dir], attributes: {targetdir}} = event.target

      searchPDFs(dir.path, targetdir.value)
    } catch (error) {
      // Pass
    }
  }

  render () {
    const {classes, state: {inputDirs: {analisys, projects}}} = this.props
    const {errorAnalisysDir, errorProjectsDir} = this.state

    return (
      <form onSubmit={(event) => event.preventDefault()}>
        <Grid container alignItems="center" direction="column">
          <Grid item xs={10} className={classes.grid}>
            <Typography
              className={classes.title}
              align="center"
              variant="headline"
              gutterBottom
            >
              <Icon className={classes.icon}>folder</Icon>
              Configuración de Directorios
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
            />
            <Button
              mini
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
            />
            <Button
              mini
              color="primary"
              variant="fab"
              onClick={() => {
                this.dirAnalisysRef.current.click()
              }}
            >
              <Icon>folder_open</Icon>
            </Button>
          </Grid>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.btnNext}
          >
            Continuar
            <Icon>arrow_right_alt</Icon>
          </Button>

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

export default connect(withStyles(styles)(DirsInput))
