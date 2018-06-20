import { PDF_LIST_RESPONSE } from 'utils/constants'

function getPDFsNameFromDir(event, args, state) {
  const { dirs } = state

  dirs[args.targetDir] = {
    files: args.files,
    path: args.path,
  }

  return { ...state, dirs: { ...dirs } }
}

export default [
  {
    func: getPDFsNameFromDir,
    name: PDF_LIST_RESPONSE,
  },
]
