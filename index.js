// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable security/detect-non-literal-fs-filename, security/detect-object-injection */
import fs from 'node:fs/promises';
import path from 'node:path';
let codeTypes = {};
let codeTypeFieldValues = {};
const currentFolder = path.dirname(import.meta.filename ?? '.');
/**
 * Returns an object of code types.
 * @returns {Promise<Record<string, string>>} - An object with "code type" keys and "code type description" values.
 */
export async function getCodeTypes() {
    if (Object.keys(codeTypes).length === 0) {
        const codeTypesData = await fs.readFile(path.join(currentFolder, 'data', 'codeTypes.json'));
        codeTypes = JSON.parse(codeTypesData);
    }
    return codeTypes;
}
/**
 * Determines if a string is a valid code type.
 * @param {string} possibleCodeType - A possible code type
 * @returns {Promise<boolean>} - True when the possibleCodeType is a valid code type.
 */
export async function isCodeType(possibleCodeType) {
    await getCodeTypes();
    return Object.hasOwn(codeTypes, possibleCodeType);
}
/**
 * Returns a description of the code type.
 * @param {string} codeType - A code type.
 * @returns {Promise<string>} - The code type description.
 */
export async function getCodeTypeDescription(codeType) {
    await getCodeTypes();
    return codeTypes[codeType];
}
/**
 * Returns an object of field values for a given code type.
 * @param {string} codeType - A code type.
 * @returns {Promise<Record<string, string>>} - An object with "field value" keys and "field value description" values.
 */
export async function getFieldValues(codeType) {
    if ((await isCodeType(codeType)) &&
        !Object.hasOwn(codeTypeFieldValues, codeType)) {
        const fieldValueData = await fs.readFile(path.join(currentFolder, 'data', `${codeType}.json`));
        codeTypeFieldValues[codeType] = JSON.parse(fieldValueData);
    }
    return codeTypeFieldValues[codeType] ?? {};
}
/**
 * Determines if a code type - field value combination is valid.
 * @param {string} possibleCodeType - A possible code type.
 * @param {string} possibleFieldValue - A possible field value
 * @returns {Promise<boolean>} - True when the possibleCodeType and possibleFieldValue are valid.
 */
export async function isFieldValue(possibleCodeType, possibleFieldValue) {
    const fieldValues = await getFieldValues(possibleCodeType);
    return Object.hasOwn(fieldValues, possibleFieldValue);
}
/**
 * Returns a description of the given field value.
 * @param {string} codeType - A code type.
 * @param {string} fieldValue - A field value.
 * @returns {Promise<string>} - A description of the field value.
 */
export async function getFieldValueDescription(codeType, fieldValue) {
    const fieldValues = await getFieldValues(codeType);
    return fieldValues[fieldValue];
}
/**
 * Clears memory of cached objects.
 */
export function clearObjectCaches() {
    codeTypes = {};
    codeTypeFieldValues = {};
}
/**
 * Loads all files into memory.
 * @returns {Promise<number>} - The number of caches loaded.
 */
export async function loadAllObjectCaches() {
    await getCodeTypes();
    for (const codeType of Object.keys(codeTypes)) {
        await getFieldValues(codeType);
    }
    return Object.keys(codeTypeFieldValues).length + 1;
}
export * as vmaHelpers from './helpers/vma.js';
