import React, {Component, createRef} from 'react'
import PropTypes from 'prop-types'
import {ipcRenderer} from 'electron'
import {blue} from '@material-ui/core/colors'
import {withStyles} from '@material-ui/core/styles'
import {
  Button,
  Icon,
  TextField,
  Typography,
  Grid
} from '@material-ui/core'
import {
  LIST_FILES_DIR_REQUEST,
  LIST_FILES_DIR_RESPONSE
} from 'utils/constants'


const styles = (theme) => ({
  'btnNext': {'marginTop': theme.spacing.unit * 5},
  'dirsInputs': {'visibility': 'hidden'},
  'grid': {'width': '100%'},
  'icon': {
    'fontSize': 32,
    'margin': '-6px 12px'
  },
  'textField': {'width': 'calc(100% - 60px)'},
  'title': {'color': blue[600]}
})

class DirsInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      'errorAnalisysDir': false,
      'errorProjectsDir': false,
      'selectedAnalisysDir': '',
      'selectedProjectsDir': ''
    }

    this.dirProjectsRef = createRef()
    this.dirAnalisysRef = createRef()

    this.getListDirs = this.getListDirs.bind(this)
    this.onSelectProjectsDir = this.onSelectProjectsDir.bind(this)
    this.onSelectAnalisysDir = this.onSelectAnalisysDir.bind(this)
  }

  componentDidMount () {
    this.dirProjectsRef.current.webkitdirectory = true
    this.dirAnalisysRef.current.webkitdirectory = true

    ipcRenderer.on(LIST_FILES_DIR_RESPONSE, this.getListDirs);
  }

  getListDirs (event, files) {
    console.log(files);
  }

  onSelectProjectsDir (event) {
    const {'files': [currentDir]} = event.target

    this.setState({'selectedProjectsDir': currentDir.path})
    ipcRenderer.send(LIST_FILES_DIR_REQUEST, {'path': currentDir.path})
  }

  onSelectAnalisysDir (event) {
    const {'files': [currentDir]} = event.target

    this.setState({'selectedAnalisysDir': currentDir.path})
    ipcRenderer.send(LIST_FILES_DIR_REQUEST, {'path': currentDir.path})
  }

  render () {
    const {classes} = this.props
    const {
      errorAnalisysDir,
      errorProjectsDir,
      selectedAnalisysDir,
      selectedProjectsDir
    } = this.state

    return (
      <form>
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
              value={selectedProjectsDir}
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
              value={selectedAnalisysDir}
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
                this.dirAnalisysRef.current.click('analisys')
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
            ref={this.dirProjectsRef}
            className={classes.dirsInputs}
            onChange={this.onSelectProjectsDir}
          />
          <input
            type="file"
            ref={this.dirAnalisysRef}
            className={classes.dirsInputs}
            onChange={this.onSelectAnalisysDir}
          />
        </Grid>
      </form>
    )
  }
}


DirsInput.propTypes = {'classes': PropTypes.object.isRequired}

export default withStyles(styles)(DirsInput)
