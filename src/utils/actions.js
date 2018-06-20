import { ipcRenderer } from 'electron'
import { PDF_LIST_REQUEST } from 'utils/constants'

function searchPDFs(path, targetDir) {
  ipcRenderer.send(PDF_LIST_REQUEST, {
    path,
    targetDir,
  })
}

export { searchPDFs }
