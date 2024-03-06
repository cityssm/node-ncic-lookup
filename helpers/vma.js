/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/indent, security/detect-non-literal-fs-filename, security/detect-object-injection */
import fs from 'node:fs/promises';
import { getFieldValueDescription, isFieldValue } from '../index.js';
export const vmaCodeType = 'VMA';
export const specificVmaSubCodeTypes = [
    'Aircraft',
    'Construction',
    'Farm',
    'Motorcycle',
    'Snowmobile',
    'Trucks',
    'Trailers'
];
/**
 * Determines if a code type is a VMA code type.
 * @param {string} possibleVmaCodeType - A possible subcode type
 * @returns {boolean} - True when the code type is a VMA code type.
 */
export function isVmaCodeType(possibleVmaCodeType) {
    return specificVmaSubCodeTypes.includes(possibleVmaCodeType);
}
/**
 * Returns a list of code types for a given field type.
 * @param {string} vmaFieldValue - A field value associated with a VMA code type.
 * @returns {string[]} - A list of code types that include the given field type.
 */
export async function getPossibleVmaSubCodeTypes(vmaFieldValue) {
    const codeTypes = [];
    for (const codeType of specificVmaSubCodeTypes) {
        if (await isFieldValue(codeType, vmaFieldValue)) {
            codeTypes.push(codeType);
        }
    }
    return codeTypes;
}
/**
 * Determines if a field value is exclusive to a specific subcode type.
 * @param {string} vmaCodeType - A code type.
 * @param {string} vmaFieldValue - A field value.
 * @returns {boolean} - True if the field value only appears under the given code type.
 */
export async function isFieldValueExclusiveToVmaSubCodeType(vmaCodeType, vmaFieldValue) {
    const codeTypes = await getPossibleVmaSubCodeTypes(vmaFieldValue);
    return codeTypes.length === 1 && codeTypes[0] === vmaCodeType;
}
let nhtsaOverrides = {};
/**
 * Returns a NHTSA-compatible vehicle make if available.
 * @param {string} vmaFieldValue - A field value associated with a VMA code type.
 * @returns {string} - A NHTSA-compatible description if available, otherwise the field description.
 */
export async function getNhtsaCompatibleMake(vmaFieldValue) {
    if (Object.keys(nhtsaOverrides).length === 0) {
        const nhtsaOverridesData = await fs.readFile(new URL('nhtsaOverrides.json', import.meta.url));
        nhtsaOverrides = JSON.parse(nhtsaOverridesData);
    }
    if (nhtsaOverrides[vmaFieldValue] === undefined) {
        return await getFieldValueDescription(vmaCodeType, vmaFieldValue);
    }
    return nhtsaOverrides[vmaFieldValue];
}
