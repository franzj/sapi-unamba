const pdfjsLib = require('pdfjs-dist')
const { compareTwoStrings } = require('string-similarity')

const START_ANALYSIS_REQUEST = 'start-analyzis-request'
const UPDATE_PROGRESS_RESPONSE = 'update-progress-response'

async function getTextFromPDF(path) {
  const pdf = await pdfjsLib.getDocument(path)

  const paragraphs = []

  // eslint-disable-next-line no-plusplus
  for (let index = 1; index <= pdf.numPages; index++) {
    // eslint-disable-next-line no-await-in-loop
    const page = await pdf.getPage(index)
    // eslint-disable-next-line no-await-in-loop
    const content = await page.getTextContent()

    let paragraph = ''

    content.items.forEach((item) => {
      if (
        /^(\s*(\d+\.{1})+(\.?)(.*))$/.test(item.str)
        || /^(IX|IV|V?I{0,3}\.(.*))$/.test(item.str)
      ) {
        if (paragraph !== '') {
          paragraphs.push({ page: index, content: paragraph })
          paragraph = ''
        }
      } else if (/^(.*\.\s*)$/.test(item.str)) {
        paragraphs.push({ page: index, content: paragraph + item.str })
        paragraph = ''
      } else {
        paragraph += item.str
      }
    })
  }

  return paragraphs
}

async function run({ dirs: { analysis, projects } }) {
  // Reiniciamos el progreso de análisis
  let progress = 0
  const report = []

  postMessage({
    type: UPDATE_PROGRESS_RESPONSE,
    data: {
      info: 'Iniciando Análisis',
      verbose: '...',
      report,
      progress,
    },
  })

  let analysisTextFile
  let projectTextFile

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < analysis.files.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    analysisTextFile = await getTextFromPDF(`${analysis.path}/${analysis.files[i]}`)

    postMessage({
      type: UPDATE_PROGRESS_RESPONSE,
      data: { info: 'Analizando...', verbose: `Analizando archivo ${analysis.files[i]}` },
    })

    report.push({ name: analysis.files[i], analyzedFiles: [] })

    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < projects.files.length; j++) {
      // eslint-disable-next-line no-await-in-loop
      projectTextFile = await getTextFromPDF(`${projects.path}/${projects.files[j]}`)

      report[i].analyzedFiles.push({ name: projects.files[j], similarities: [] })

      let rating = 0

      // eslint-disable-next-line no-plusplus
      for (let x = 0; x < analysisTextFile.length; x++) {
        const targetText = { ...analysisTextFile[x], bestMatch: [] }

        // eslint-disable-next-line no-plusplus
        for (let y = 0; y < projectTextFile.length; y++) {
          rating = compareTwoStrings(targetText.content, projectTextFile[y].content)

          if (rating >= 0.9) {
            targetText.bestMatch.push({ ...projectTextFile[y], rating })
          }
        }

        if (targetText.bestMatch.length > 0) {
          report[i].analyzedFiles[j].similarities.push(targetText)
        }
      }
    }

    progress += 100 / analysis.files.length

    postMessage({ type: UPDATE_PROGRESS_RESPONSE, data: { progress } })
  }

  postMessage({
    type: UPDATE_PROGRESS_RESPONSE,
    data: {
      info: 'Análisis Terminado',
      verbose: '',
      progress: 100,
      report,
    },
  })
}

onmessage = ({ data: { type, data } }) => {
  switch (type) {
    case START_ANALYSIS_REQUEST: {
      run(data)
      break
    }
    default:
      break
  }
}
