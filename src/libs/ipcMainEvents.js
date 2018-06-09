import fs from 'fs'
import { promisify } from 'util'
import { PDF_LIST_REQUEST, PDF_LIST_RESPONSE } from '../utils/constants'


const readdir = promisify(fs.readdir)


async function getPDFsNameFromDir(event, args) {
  try {
    const files = await readdir(args.path)
    const pdfs = files.filter(file => file.match(/.*\.(pdf)/ig))

    event.sender.send(PDF_LIST_RESPONSE, { ...args, files: pdfs })
  } catch (error) {
    event.sender.send(PDF_LIST_RESPONSE, { error: 'El directorio no existe' })
  }
}


export default [
  {
    func: getPDFsNameFromDir,
    name: PDF_LIST_REQUEST,
  },
]
