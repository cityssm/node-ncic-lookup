/**
 * Returns an object of code types.
 * @returns {Promise<Record<string, string>>} - An object with "code type" keys and "code type description" values.
 */
export declare function getCodeTypes(): Promise<Record<string, string>>;
/**
 * Determines if a string is a valid code type.
 * @param {string} possibleCodeType - A possible code type
 * @returns {Promise<boolean>} - True when the possibleCodeType is a valid code type.
 */
export declare function isCodeType(possibleCodeType: string): Promise<boolean>;
/**
 * Returns a description of the code type.
 * @param {string} codeType - A code type.
 * @returns {Promise<string>} - The code type description.
 */
export declare function getCodeTypeDescription(codeType: string): Promise<string | undefined>;
/**
 * Returns an object of field values for a given code type.
 * @param {string} codeType - A code type.
 * @returns {Promise<Record<string, string>>} - An object with "field value" keys and "field value description" values.
 */
export declare function getFieldValues(codeType: string): Promise<Record<string, string>>;
/**
 * Determines if a code type - field value combination is valid.
 * @param {string} possibleCodeType - A possible code type.
 * @param {string} possibleFieldValue - A possible field value
 * @returns {Promise<boolean>} - True when the possibleCodeType and possibleFieldValue are valid.
 */
export declare function isFieldValue(possibleCodeType: string, possibleFieldValue: string): Promise<boolean>;
/**
 * Returns a description of the given field value.
 * @param {string} codeType - A code type.
 * @param {string} fieldValue - A field value.
 * @returns {Promise<string>} - A description of the field value.
 */
export declare function getFieldValueDescription(codeType: string, fieldValue: string): Promise<string | undefined>;
/**
 * Clears memory of cached objects.
 */
export declare function clearObjectCaches(): void;
/**
 * Loads all files into memory.
 * @returns {Promise<number>} - The number of caches loaded.
 */
export declare function loadAllObjectCaches(): Promise<number>;
export * as vmaHelpers from './helpers/vma.js';
