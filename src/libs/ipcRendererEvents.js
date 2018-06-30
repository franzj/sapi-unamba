import {
  PDF_LIST_RESPONSE, UPDATE_PROGRESS_RESPONSE, UPDATE_REPORT_RESPONSE,
} from 'utils/constants'

function getPDFsNameFromDir(event, args, state) {
  return {
    ...state,
    dirs: {
      ...state.dirs,
      [args.targetDir]: {
        files: args.files,
        path: args.path,
      },
    },
  }
}

function updateProgress(event, args, state) {
  return {
    ...state,
    analyzing: {
      ...state.analyzing,
      ...args,
    },
  }
}

function updateReport(event, args, state) {
  return { ...state, ...args }
}

export default [
  {
    func: getPDFsNameFromDir,
    name: PDF_LIST_RESPONSE,
  },
  {
    func: updateProgress,
    name: UPDATE_PROGRESS_RESPONSE,
  },
  {
    func: updateReport,
    name: UPDATE_REPORT_RESPONSE,
  },
]
