// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable security/detect-object-injection */

import fs from 'node:fs/promises'

let codeTypes: Record<string, string> = {}
let codeTypeFieldValues: Record<string, Record<string, string>> = {}

/**
 * Returns an object of code types.
 * @returns {Promise<Record<string, string>>} - An object with "code type" keys and "code type description" values.
 */
export async function getCodeTypes(): Promise<Record<string, string>> {
  if (Object.keys(codeTypes).length === 0) {
    const codeTypesData = await fs.readFile('./data/codeTypes.json')
    codeTypes = JSON.parse(codeTypesData as unknown as string)
  }

  return codeTypes
}

/**
 * Determines if a string is a valid code type.
 * @param {string} possibleCodeType - A possible code type
 * @returns {Promise<boolean>} - True when the possibleCodeType is a valid code type.
 */
export async function isCodeType(possibleCodeType: string): Promise<boolean> {
  await getCodeTypes()
  return Object.hasOwn(codeTypes, possibleCodeType)
}

/**
 * Returns a description of the code type.
 * @param {string} codeType - A code type.
 * @returns {Promise<string>} - The code type description.
 */
export async function getCodeTypeDescription(
  codeType: string
): Promise<string | undefined> {
  await getCodeTypes()
  return codeTypes[codeType]
}

/**
 * Returns an object of field values for a given code type.
 * @param {string} codeType - A code type.
 * @returns {Promise<Record<string, string>>} - An object with "field value" keys and "field value description" values.
 */
export async function getFieldValues(
  codeType: string
): Promise<Record<string, string>> {
  if (
    (await isCodeType(codeType)) &&
    !Object.hasOwn(codeTypeFieldValues, codeType)
  ) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const fieldValueData = await fs.readFile(`./data/${codeType}.json`)

    codeTypeFieldValues[codeType] = JSON.parse(
      fieldValueData as unknown as string
    )
  }

  return codeTypeFieldValues[codeType] ?? {}
}

/**
 * Determines if a code type - field value combination is valid.
 * @param {string} possibleCodeType - A possible code type.
 * @param {string} possibleFieldValue - A possible field value
 * @returns {Promise<boolean>} - True when the possibleCodeType and possibleFieldValue are valid.
 */
export async function isFieldValue(
  possibleCodeType: string,
  possibleFieldValue: string
): Promise<boolean> {
  const fieldValues = await getFieldValues(possibleCodeType)
  return Object.hasOwn(fieldValues, possibleFieldValue)
}

/**
 * Returns a description of the given field value.
 * @param {string} codeType - A code type.
 * @param {string} fieldValue - A field value.
 * @returns {Promise<string>} - A description of the field value.
 */
export async function getFieldValueDescription(
  codeType: string,
  fieldValue: string
): Promise<string | undefined> {
  const fieldValues = await getFieldValues(codeType)
  return fieldValues[fieldValue]
}

/**
 * Clears memory of cached objects.
 */
export function clearObjectCaches(): void {
  codeTypes = {}
  codeTypeFieldValues = {}
}

/**
 * Loads all files into memory.
 * @returns {Promise<number>} - The number of caches loaded.
 */
export async function loadAllObjectCaches(): Promise<number> {
  await getCodeTypes()

  for (const codeType of Object.keys(codeTypes)) {
    await getFieldValues(codeType)
  }

  return Object.keys(codeTypeFieldValues).length + 1
}

export * as vmaHelpers from './helpers/vma.js'
