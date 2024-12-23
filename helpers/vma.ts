
// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable security/detect-object-injection */

import {
  type ValidCodeTypes,
  getFieldValueDescription,
  isFieldValue
} from '../index.js'

import nhtsaOverrides from './nhtsaOverrides.data.js'


export const vmaCodeType = 'VMA'

export const specificVmaSubCodeTypes = [
  'Aircraft',
  'Construction',
  'Farm',
  'Motorcycle',
  'Snowmobile',
  'Trucks',
  'Trailers'
] as const satisfies ValidCodeTypes[]

/**
 * Determines if a code type is a VMA code type.
 * @param possibleVmaCodeType - A possible subcode type
 * @returns - True when the code type is a VMA code type.
 */
export function isVmaCodeType(
  possibleVmaCodeType: string
): possibleVmaCodeType is (typeof specificVmaSubCodeTypes)[number] {
  return (specificVmaSubCodeTypes as unknown as string[]).includes(
    possibleVmaCodeType
  )
}

/**
 * Returns a list of code types for a given field type.
 * @param vmaFieldValue - A field value associated with a VMA code type.
 * @returns - A list of code types that include the given field type.
 */
export async function getPossibleVmaSubCodeTypes(
  vmaFieldValue: string
): Promise<Array<(typeof specificVmaSubCodeTypes)[number]>> {
  const codeTypes: Array<(typeof specificVmaSubCodeTypes)[number]> = []

  for (const codeType of specificVmaSubCodeTypes) {
    if (await isFieldValue(codeType, vmaFieldValue)) {
      codeTypes.push(codeType)
    }
  }

  return codeTypes
}

/**
 * Determines if a field value is exclusive to a specific subcode type.
 * @param vmaCodeType - A code type.
 * @param vmaFieldValue - A field value.
 * @returns - True if the field value only appears under the given code type.
 */
export async function isFieldValueExclusiveToVmaSubCodeType(
  vmaCodeType: (typeof specificVmaSubCodeTypes)[number],
  vmaFieldValue: string
): Promise<boolean> {
  const codeTypes = await getPossibleVmaSubCodeTypes(vmaFieldValue)

  return codeTypes.length === 1 && codeTypes[0] === vmaCodeType
}

/**
 * Returns a NHTSA-compatible vehicle make if available.
 * @param vmaFieldValue - A field value associated with a VMA code type.
 * @returns - A NHTSA-compatible description if available, otherwise the field description.
 */
export async function getNhtsaCompatibleMake(
  vmaFieldValue: string
): Promise<string | undefined> {

  if (nhtsaOverrides[vmaFieldValue] === undefined) {
    return await getFieldValueDescription(vmaCodeType, vmaFieldValue)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return nhtsaOverrides[vmaFieldValue]
}
