/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/indent */
import { isFieldValue } from '../index.js';
export const vmaCodeType = 'VMA';
export const specificVmaCodeTypes = [
    'Aircraft',
    'Auto',
    'Construction',
    'Farm',
    'Motorcycle',
    'Snowmobile',
    'Trucks',
    'Trailers'
];
/**
 * Determines if a code type is a VMA code type.
 * @param {string} possibleVmaCodeType - A possible code type
 * @returns {boolean} - True when the code type is a VMA code type.
 */
export function isVmaCodeType(possibleVmaCodeType) {
    return specificVmaCodeTypes.includes(possibleVmaCodeType);
}
/**
 * Returns a list of code types for a given field type.
 * @param {string} vmaFieldValue - A field type associated with a VMA code type.
 * @returns {string[]} - A list of code types that include the given field type.
 */
export async function getPossibleVmaCodeTypes(vmaFieldValue) {
    const codeTypes = [];
    for (const codeType of specificVmaCodeTypes) {
        if (await isFieldValue(codeType, vmaFieldValue)) {
            codeTypes.push(codeType);
        }
    }
    return codeTypes;
}
/**
 * Determines if a field value is exclusive to a specific code type.
 * @param {string} vmaCodeType - A code type.
 * @param {string} vmaFieldValue - A field value.
 * @returns {boolean} - True if the field value only appears under the given code type.
 */
export async function isFieldValueExclusiveToVmaCodeType(vmaCodeType, vmaFieldValue) {
    const codeTypes = await getPossibleVmaCodeTypes(vmaFieldValue);
    return codeTypes.length === 1 && codeTypes[0] === vmaCodeType;
}
