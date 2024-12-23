// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable security/detect-non-literal-fs-filename, security/detect-object-injection */
import fs from 'node:fs/promises';
import codeTypes from './data/codeTypes.data.js';
export const ncicVersion = '5.2';
let codeTypeFieldValues = {};
/**
 * Returns an object of code types.
 * @returns An object with "code type" keys and "code type description" values.
 */
export function getCodeTypes() {
    return codeTypes;
}
/**
 * Determines if a string is a valid code type.
 * @param possibleCodeType - A possible code type
 * @returns `true` when the possibleCodeType is a valid code type.
 */
export function isCodeType(possibleCodeType) {
    return Object.hasOwn(codeTypes, possibleCodeType);
}
/**
 * Returns a description of the code type.
 * @param codeType - A code type.
 * @returns The code type description.
 */
export function getCodeTypeDescription(codeType) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return codeTypes[codeType];
}
/**
 * Returns an object of field values for a given code type.
 * @param codeType - A code type.
 * @returns An object with "field value" keys and "field value description" values.
 */
export async function getFieldValues(codeType) {
    if (isCodeType(codeType) && !Object.hasOwn(codeTypeFieldValues, codeType)) {
        const fieldValueData = await fs.readFile(new URL(`data/${codeType}.json`, import.meta.url));
        codeTypeFieldValues[codeType] = JSON.parse(fieldValueData);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return codeTypeFieldValues[codeType] ?? {};
}
/**
 * Determines if a code type - field value combination is valid.
 * @param codeType - A code type.
 * @param possibleFieldValue - A possible field value
 * @returns `true` when the codeType and possibleFieldValue are valid.
 */
export async function isFieldValue(codeType, possibleFieldValue) {
    const fieldValues = await getFieldValues(codeType);
    return Object.hasOwn(fieldValues, possibleFieldValue);
}
/**
 * Returns a description of the given field value.
 * @param codeType - A code type.
 * @param fieldValue - A field value.
 * @returns A description of the field value.
 */
export async function getFieldValueDescription(codeType, fieldValue) {
    const fieldValues = await getFieldValues(codeType);
    return fieldValues[fieldValue];
}
/**
 * Clears memory of cached objects.
 */
export function clearObjectCaches() {
    codeTypeFieldValues = {};
}
/**
 * Loads all files into memory.
 * @returns The number of caches loaded.
 */
export async function loadAllObjectCaches() {
    for (const codeType of Object.keys(codeTypes)) {
        await getFieldValues(codeType);
    }
    return Object.keys(codeTypeFieldValues).length + 1;
}
export * as vmaHelpers from './helpers/vma.js';
