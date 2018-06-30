import Worker from 'tiny-worker'
import isDev from 'electron-is-dev'
import path from 'path'
import { START_ANALYSIS_REQUEST, UPDATE_PROGRESS_RESPONSE } from './constants'

let worker

async function runProcess(event, args) {
  if (isDev) {
    worker = new Worker(path.join(__dirname, '../', 'worker.js'))
  } else {
    worker = new Worker(path.join(__dirname, 'worker.js'))
  }

  worker.onmessage = ({ data: { type, data } }) => {
    switch (type) {
      case UPDATE_PROGRESS_RESPONSE: {
        event.sender.send(UPDATE_PROGRESS_RESPONSE, data)
        break
      }
      default:
        break
    }
  }

  worker.postMessage({ type: START_ANALYSIS_REQUEST, data: args })
}

function killProcess() {
  worker.terminate()
}

export { runProcess, killProcess }
