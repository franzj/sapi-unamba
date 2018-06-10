import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'utils/store'
import { DirsInput, StartAnalysis, ProgressAnalysis, Report } from 'containers'
import { Fade, Grid, Step, Stepper, StepLabel } from '@material-ui/core'


@connect
export default class Process extends Component {
  static propTypes = {
    state: PropTypes.shape({
      step: PropTypes.number.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      steps: [
        'Seleccionar directorios',
        'Listo para iniciar análisis',
        'Analizando archivos',
        'Reporte de análisis',
      ],
    }

    this.getStepProcess = this.getStepProcess.bind(this)
  }

  getStepProcess(step) {
    switch (step) {
      case 0:
        return <DirsInput />
      case 1:
        return <StartAnalysis />
      case 2:
        return <ProgressAnalysis />
      case 3:
        return <Report />
      default:
        return null
    }
  }

  render() {
    const { steps } = this.state
    const { state: { step } } = this.props

    return (
      <Fade in>
        <Grid container spacing={24} direction="column">
          <Grid item>
            <Stepper activeStep={step} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item>
            {this.getStepProcess(step)}
          </Grid>
        </Grid>
      </Fade>
    )
  }
}
