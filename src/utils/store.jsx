import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import events from 'libs/ipcRendererEvents'
import { ipcRenderer } from 'electron'
import { searchPDFs } from 'utils/actions'

const Context = createContext()

class Provider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      actions: {
        searchPDFs,
        handleNext: this.handleNext,
        handleBack: this.handleBack,
      },
      state: {
        dirs: {
          analisys: { files: [], path: '' },
          projects: { files: [], path: '' },
        },
        step: 0,
      },
    }
  }

  componentDidMount() {
    // Registramos los eventos del ipcRenderer
    events.forEach((event) => {
      ipcRenderer.on(event.name, (event_, args) => {
        const { state } = this.state

        this.setState({ state: event.func(event_, args, state) })
      })
    })
  }

  handleNext = () => {
    const { step } = this.state.state

    if (step < 3) {
      this.setState(prevState => ({
        state: { ...prevState.state, step: prevState.state.step + 1 },
      }))
    }
  }

  handleBack = () => {
    const { step } = this.state.state

    if (step > 0) {
      this.setState(prevState => ({
        state: { ...prevState.state, step: prevState.state.step - 1 },
      }))
    }
  }

  render() {
    const { children } = this.props

    return <Context.Provider value={this.state}>{children}</Context.Provider>
  }
}

const connect = WrappedComponent => () => (
  <Context.Consumer>{context => <WrappedComponent {...context} />}</Context.Consumer>
)

export { Provider, connect }
