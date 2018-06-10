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
    for (let index = 0; index < events.length; index++) {
      ipcRenderer.on(events[index].name, (event, args) => {
        const { state } = this.state

        this.setState({
          state: events[index].func(event, args, state),
        })
      })
    }
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

    return (
      <Context.Provider value={this.state}>
        {children}
      </Context.Provider>
    )
  }
}

function connect(WrappedComponent) {
  return () => (
    <Context.Consumer>
      {context => <WrappedComponent {...context} />}
    </Context.Consumer>
  )
}


export {
  Provider,
  connect,
}
