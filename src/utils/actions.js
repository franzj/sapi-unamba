import { ipcRenderer } from 'electron'
import { PDF_LIST_REQUEST, START_ANALYSIS_REQUEST, STOP_ANALYSIS_REQUEST } from 'utils/constants'

function searchPDFs(path, targetDir) {
  ipcRenderer.send(PDF_LIST_REQUEST, {
    path,
    targetDir,
  })
}

function startAnalysis(dirs) {
  return new Promise((resolve, reject) => {
    const msg = ipcRenderer.sendSync(START_ANALYSIS_REQUEST, { dirs })

    if (msg.ok) {
      resolve(msg)
    } else {
      reject(msg)
    }
  })
}

function stopAnalysis() {
  return new Promise((resolve, reject) => {
    const msg = ipcRenderer.sendSync(STOP_ANALYSIS_REQUEST)

    if (msg.ok) {
      resolve(msg)
    } else {
      reject(msg)
    }
  })
}

export { searchPDFs, startAnalysis, stopAnalysis }
