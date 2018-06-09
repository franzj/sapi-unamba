import React, {Component, createContext} from 'react'
import PropTypes from 'prop-types'
import {ipcRenderer} from 'electron'
import {events} from 'libs/ipcRendererEvents'
import {searchPDFs} from 'utils/actions'


const Context = createContext()

class Provider extends Component {
  static propTypes = {
    'children': PropTypes.node.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      'actions': {
        searchPDFs
      },
      'state': {
        'inputDirs': {
          'analisys': {
            'files': [],
            'path': ''
          },
          'projects': {
            'files': [],
            'path': ''
          }
        }
      }
    }
  }

  componentDidMount () {
    // Registramos los eventos del ipcRenderer
    for (let index = 0; index < events.length; index++) {
      ipcRenderer.on(events[index].name, (event, args) => {
        const {state} = this.state

        this.setState({
          'state': events[index].func(event, args, state)
        })
      })
    }
  }

  render () {
    const {children} = this.props

    return (
      <Context.Provider value={this.state}>
        {children}
      </Context.Provider>
    )
  }
}

function connect (WrappedComponent) {
  function render () {
    return (
      <Context.Consumer>
        {(context) => <WrappedComponent {...context}/>}
      </Context.Consumer>
    )
  }

  return () => render()
}


export {
  Provider,
  connect
}
