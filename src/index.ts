import fs from 'node:fs'
import path from 'node:path'
import fg from 'fast-glob'

import processScss from './lib/scss'

const files = fg.globSync(['govuk-frontend/**/*', '!**/dist/**'])

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8')

  const folder = file
    .split('/')
    .slice(0, -1)
    .join('/')
    .replace(/govuk/g, 'nhsuk')
  const destination = file.replace(/govuk/g, 'nhsuk')

  fs.mkdirSync(folder, { recursive: true })

  if (path.extname(file) === '.scss') {
    const input = content.replace(/govuk/g, 'nhsuk').replace(/GOVUK/g, 'NHSUK')

    processScss(input, destination)
  } else {
    let newContent = content
      .replace(/govuk/g, 'nhsuk')
      .replace(/GOVUK/g, 'NHSUK')

    if (path.basename(file) === 'package.json') {
      newContent = newContent.replace(
        /"nhsuk-prototype-kit":/g,
        '"govuk-prototype-kit":',
      )
    }

    fs.writeFileSync(destination, newContent)
  }
})
