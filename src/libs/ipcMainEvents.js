import fs from 'fs'
import { promisify } from 'util'
import { runProcess, killProcess } from '../utils/process'
import {
  PDF_LIST_REQUEST,
  PDF_LIST_RESPONSE,
  START_ANALYSIS_REQUEST,
  STOP_ANALYSIS_REQUEST,
} from '../utils/constants'

const readdir = promisify(fs.readdir)

async function getPDFsNameFromDir(event, args) {
  try {
    const files = await readdir(args.path)
    const pdfs = files.filter(file => file.match(/.*\.(pdf)/gi))

    event.sender.send(PDF_LIST_RESPONSE, { ...args, files: pdfs })
  } catch (error) {
    event.sender.send(PDF_LIST_RESPONSE, { error: 'El directorio no existe' })
  }
}

function startAnalysisProcess(event, args) {
  try {
    runProcess(event, args)
    event.returnValue = { ok: true } // eslint-disable-line no-param-reassign
  } catch (error) {
    event.returnValue = { ok: false, error } // eslint-disable-line no-param-reassign
  }
}

function stopAnalysisProcess(event) {
  try {
    killProcess()
    event.returnValue = { ok: true } // eslint-disable-line no-param-reassign
  } catch (error) {
    event.returnValue = { ok: false, error } // eslint-disable-line no-param-reassign
  }
}

export default [
  {
    func: getPDFsNameFromDir,
    name: PDF_LIST_REQUEST,
  },
  {
    func: startAnalysisProcess,
    name: START_ANALYSIS_REQUEST,
  },
  {
    func: stopAnalysisProcess,
    name: STOP_ANALYSIS_REQUEST,
  },
]
