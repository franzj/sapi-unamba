import {PDF_LIST_RESPONSE} from 'utils/constants'


function getPDFsNameFromDir (event, args, state) {
  const {inputDirs} = state

  inputDirs[args.targetDir] = {
    'files': args.files,
    'path': args.path
  }

  return {
    ...state,
    'inputDirs': {
      ...inputDirs
    }
  }
}


const events = [
  {
    'func': getPDFsNameFromDir,
    'name': PDF_LIST_RESPONSE
  }
]

export {
  events
}
