import fs from 'fs'
import {
  LIST_FILES_DIR_REQUEST,
  LIST_FILES_DIR_RESPONSE
} from '../utils/constants'


function listFilesDir (event, arg) {
  const files = fs.readdirSync(arg.path).
    filter((file) => file.match(/.*\.(pdf)/ig))

  event.sender.send(LIST_FILES_DIR_RESPONSE, files)
}


const events = [
  {
    'func': listFilesDir,
    'name': LIST_FILES_DIR_REQUEST
  }
]

export default events
