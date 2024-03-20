import type codeTypesJson from './data/codeTypes.json';
export type ValidCodeTypes = keyof typeof codeTypesJson;
type InvalidCodeTypes = Exclude<string, ValidCodeTypes>;
export declare const ncicVersion = "5.2";
/**
 * Returns an object of code types.
 * @returns {Promise<Record<string, string>>} - An object with "code type" keys and "code type description" values.
 */
export declare function getCodeTypes(): Promise<Record<ValidCodeTypes, string>>;
/**
 * Determines if a string is a valid code type.
 * @param {string} possibleCodeType - A valid code type
 * @returns {Promise<true>} - True when the possibleCodeType is a valid code type.
 */
export declare function isCodeType(possibleCodeType: ValidCodeTypes): Promise<true>;
/**
 * Determines if a string is a valid code type.
 * @param {string} possibleCodeType - An invalid code type
 * @returns {Promise<false>} - False when the possibleCodeType is an invalid code type.
 */
export declare function isCodeType(possibleCodeType: InvalidCodeTypes): Promise<false>;
/**
 * Returns a description of the code type.
 * @param {string} codeType - A valid code type.
 * @returns {Promise<string>} - The code type description.
 */
export declare function getCodeTypeDescription(codeType: ValidCodeTypes): Promise<string>;
/**
 * Returns a description of the code type.
 * @param {string} codeType - An invalid code type.
 * @returns {Promise<undefined>} - Undefined
 */
export declare function getCodeTypeDescription(codeType: InvalidCodeTypes): Promise<undefined>;
/**
 * Returns an object of field values for a given code type.
 * @param {string} codeType - A valid code type.
 * @returns {Promise<Record<string, string>>} - An object with "field value" keys and "field value description" values.
 */
export declare function getFieldValues(codeType: ValidCodeTypes): Promise<Record<string, string>>;
/**
 * Returns an object of field values for a given code type.
 * @param {string} codeType - An invalid code type.
 * @returns {Promise<Record<string, never>>} - An empty object
 */
export declare function getFieldValues(codeType: InvalidCodeTypes): Promise<Record<string, never>>;
/**
 * Determines if a code type - field value combination is valid.
 * @param {string} codeType - A valid code type.
 * @param {string} possibleFieldValue - A possible field value
 * @returns {Promise<boolean>} - True when the codeType and possibleFieldValue are valid.
 */
export declare function isFieldValue(codeType: ValidCodeTypes, possibleFieldValue: string): Promise<boolean>;
/**
 * Determines if a code type - field value combination is valid.
 * @param {string} codeType - An invalid code type.
 * @param {string} possibleFieldValue - A possible field value
 * @returns {Promise<false>} - False when the codeType is invalid.
 */
export declare function isFieldValue(codeType: InvalidCodeTypes, possibleFieldValue: string): Promise<false>;
/**
 * Returns a description of the given field value.
 * @param {string} codeType - A valid code type.
 * @param {string} fieldValue - A field value.
 * @returns {Promise<string | undefined>} - A description of the field value.
 */
export declare function getFieldValueDescription(codeType: ValidCodeTypes, fieldValue: string): Promise<string | undefined>;
/**
 * Returns a description of the given field value.
 * @param {string} codeType - An invalid code type.
 * @param {string} fieldValue - A field value.
 * @returns {Promise<undefined>} - Undefined
 */
export declare function getFieldValueDescription(codeType: InvalidCodeTypes, fieldValue: string): Promise<undefined>;
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
