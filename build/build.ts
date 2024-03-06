// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable n/no-unpublished-import */

import fs from 'node:fs/promises'
import path from 'node:path'

import xml2js from 'xml2js'

import type { XsdSimpleType } from './xmlTypes.js'

const ncicXsdUrl = 'https://release.niem.gov/niem/5.2/xsd/codes/ncic.xsd'
const ncicXsdPath = './build/temp/ncic.xsd'

const dataPath = './data'

const codeDescriptionPrefix = 'A data type for '

async function downloadXsd(): Promise<boolean> {
  console.log(`Downloading XSD from ${ncicXsdUrl}`)

  const xsdResponse = await fetch(ncicXsdUrl)

  if (xsdResponse.ok) {
    const xsdData = await xsdResponse.text()
    console.log('Downloaded XSD successfully.')

    console.log(`Writing XSD to ${ncicXsdPath}`)
    await fs.writeFile(ncicXsdPath, xsdData)

    console.log('Wrote XSD successfully.')
    return true
  }

  return false
}

async function clearData(): Promise<void> {
  for (const file of await fs.readdir(dataPath)) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await fs.unlink(path.join(dataPath, file))
  }
}

async function parseXsd(): Promise<void> {
  const xmlData = await fs.readFile(ncicXsdPath)

  const xml = await xml2js.parseStringPromise(xmlData, {
    tagNameProcessors: [xml2js.processors.stripPrefix]
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const simpleTypes = Object.values(xml.schema.simpleType) as XsdSimpleType[]

  const codeTypes: Record<string, string> = {}

  for (const simpleType of simpleTypes) {
    const codeType = simpleType.$.name.slice(0, -14)
    let codeDescription = simpleType.annotation[0].documentation[0]

    if (codeDescription.startsWith(codeDescriptionPrefix)) {
      codeDescription = codeDescription
        .slice(codeDescriptionPrefix.length)
        .trim()
    }

    const codes: Record<string, string> = {}

    for (const enumeration of simpleType.restriction[0].enumeration) {
      const fieldValue = enumeration.$.value
      const fieldDescription = enumeration.annotation[0].documentation[0]

      // eslint-disable-next-line security/detect-object-injection
      codes[fieldValue] = fieldDescription
    }

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await fs.writeFile(
      `${dataPath}/${codeType}.json`,
      JSON.stringify(codes, undefined, 2)
    )

    // eslint-disable-next-line security/detect-object-injection
    codeTypes[codeType] = codeDescription
  }

  await fs.writeFile(
    `${dataPath}/codeTypes.json`,
    JSON.stringify(codeTypes, undefined, 2)
  )
}

const success = await downloadXsd()

if (success) {
  await clearData()
  await parseXsd()
}
