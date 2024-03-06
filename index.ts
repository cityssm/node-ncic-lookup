// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/indent, security/detect-non-literal-fs-filename, security/detect-object-injection */

import fs from 'node:fs/promises'

import type codeTypesJson from './data/codeTypes.json'

export type ValidCodeTypes = keyof typeof codeTypesJson
type InvalidCodeTypes = Exclude<string, ValidCodeTypes>

let codeTypes: Record<keyof typeof codeTypesJson, string> | undefined
let codeTypeFieldValues: Partial<
  Record<keyof typeof codeTypesJson, Record<string, string>>
> = {}

/**
 * Returns an object of code types.
 * @returns {Promise<Record<string, string>>} - An object with "code type" keys and "code type description" values.
 */
export async function getCodeTypes(): Promise<Record<ValidCodeTypes, string>> {
  if (codeTypes === undefined) {
    const codeTypesData = await fs.readFile(
      new URL('data/codeTypes.json', import.meta.url)
    )
    codeTypes = JSON.parse(codeTypesData as unknown as string)
  }

  return codeTypes as Record<ValidCodeTypes, string>
}

/**
 * Determines if a string is a valid code type.
 * @param {string} possibleCodeType - A valid code type
 * @returns {Promise<true>} - True when the possibleCodeType is a valid code type.
 */
export async function isCodeType(
  possibleCodeType: ValidCodeTypes
): Promise<true>

/**
 * Determines if a string is a valid code type.
 * @param {string} possibleCodeType - An invalid code type
 * @returns {Promise<false>} - False when the possibleCodeType is an invalid code type.
 */
export async function isCodeType(
  possibleCodeType: InvalidCodeTypes
): Promise<false>

/**
 * Determines if a string is a valid code type.
 * @param {string} possibleCodeType - A possible code type
 * @returns {Promise<boolean>} - True when the possibleCodeType is a valid code type.
 */
export async function isCodeType(possibleCodeType: string): Promise<boolean> {
  await getCodeTypes()

  if (codeTypes === undefined) {
    return false
  }

  return Object.hasOwn(codeTypes, possibleCodeType)
}

/**
 * Returns a description of the code type.
 * @param {string} codeType - A valid code type.
 * @returns {Promise<string>} - The code type description.
 */
export async function getCodeTypeDescription(
  codeType: ValidCodeTypes
): Promise<string>

/**
 * Returns a description of the code type.
 * @param {string} codeType - An invalid code type.
 * @returns {Promise<undefined>} - Undefined
 */
export async function getCodeTypeDescription(
  codeType: InvalidCodeTypes
): Promise<undefined>

/**
 * Returns a description of the code type.
 * @param {string} codeType - A code type.
 * @returns {Promise<string>} - The code type description.
 */
export async function getCodeTypeDescription(
  codeType: string
): Promise<string | undefined> {
  await getCodeTypes()

  if (codeTypes === undefined) {
    return undefined
  }

  return codeTypes[codeType]
}

/**
 * Returns an object of field values for a given code type.
 * @param {string} codeType - A valid code type.
 * @returns {Promise<Record<string, string>>} - An object with "field value" keys and "field value description" values.
 */
export async function getFieldValues(
  codeType: ValidCodeTypes
): Promise<Record<string, string>>

/**
 * Returns an object of field values for a given code type.
 * @param {string} codeType - An invalid code type.
 * @returns {Promise<Record<string, never>>} - An empty object
 */
export async function getFieldValues(
  codeType: InvalidCodeTypes
): Promise<Record<string, never>>

/**
 * Returns an object of field values for a given code type.
 * @param {string} codeType - A code type.
 * @returns {Promise<Record<string, string>>} - An object with "field value" keys and "field value description" values.
 */
export async function getFieldValues(codeType: string): Promise<unknown> {
  if (
    (await isCodeType(codeType)) &&
    !Object.hasOwn(codeTypeFieldValues, codeType)
  ) {
    const fieldValueData = await fs.readFile(
      new URL(`data/${codeType}.json`, import.meta.url)
    )

    codeTypeFieldValues[codeType] = JSON.parse(
      fieldValueData as unknown as string
    )
  }

  return codeTypeFieldValues[codeType] ?? {}
}

/**
 * Determines if a code type - field value combination is valid.
 * @param {string} codeType - A valid code type.
 * @param {string} possibleFieldValue - A possible field value
 * @returns {Promise<boolean>} - True when the codeType and possibleFieldValue are valid.
 */
export async function isFieldValue(
  codeType: ValidCodeTypes,
  possibleFieldValue: string
): Promise<boolean>

/**
 * Determines if a code type - field value combination is valid.
 * @param {string} codeType - An invalid code type.
 * @param {string} possibleFieldValue - A possible field value
 * @returns {Promise<false>} - False when the codeType is invalid.
 */
export async function isFieldValue(
  codeType: InvalidCodeTypes,
  possibleFieldValue: string
): Promise<false>

/**
 * Determines if a code type - field value combination is valid.
 * @param {string} codeType - A code type.
 * @param {string} possibleFieldValue - A possible field value
 * @returns {Promise<boolean>} - True when the codeType and possibleFieldValue are valid.
 */
export async function isFieldValue(
  codeType: string,
  possibleFieldValue: string
): Promise<boolean> {
  const fieldValues = await getFieldValues(codeType)
  return Object.hasOwn(fieldValues, possibleFieldValue)
}

/**
 * Returns a description of the given field value.
 * @param {string} codeType - A valid code type.
 * @param {string} fieldValue - A field value.
 * @returns {Promise<string | undefined>} - A description of the field value.
 */
export async function getFieldValueDescription(
  codeType: ValidCodeTypes,
  fieldValue: string
): Promise<string | undefined>

/**
 * Returns a description of the given field value.
 * @param {string} codeType - An invalid code type.
 * @param {string} fieldValue - A field value.
 * @returns {Promise<undefined>} - Undefined
 */
export async function getFieldValueDescription(
  codeType: InvalidCodeTypes,
  fieldValue: string
): Promise<undefined>

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
  codeTypes = undefined
  codeTypeFieldValues = {}
}

/**
 * Loads all files into memory.
 * @returns {Promise<number>} - The number of caches loaded.
 */
export async function loadAllObjectCaches(): Promise<number> {
  await getCodeTypes()

  if (codeTypes === undefined) {
    return 0
  }

  for (const codeType of Object.keys(codeTypes) as Array<
    keyof typeof codeTypesJson
  >) {
    await getFieldValues(codeType)
  }

  return Object.keys(codeTypeFieldValues).length + 1
}

export * as vmaHelpers from './helpers/vma.js'
