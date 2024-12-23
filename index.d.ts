import codeTypes from './data/codeTypes.data.js';
export type ValidCodeTypes = keyof typeof codeTypes;
export declare const ncicVersion = "5.2";
/**
 * Returns an object of code types.
 * @returns An object with "code type" keys and "code type description" values.
 */
export declare function getCodeTypes(): Record<ValidCodeTypes, string>;
/**
 * Determines if a string is a valid code type.
 * @param possibleCodeType - A possible code type
 * @returns `true` when the possibleCodeType is a valid code type.
 */
export declare function isCodeType(possibleCodeType: string): possibleCodeType is ValidCodeTypes;
/**
 * Returns a description of the code type.
 * @param codeType - A code type.
 * @returns The code type description.
 */
export declare function getCodeTypeDescription(codeType: string): string | undefined;
/**
 * Returns an object of field values for a given code type.
 * @param codeType - A code type.
 * @returns An object with "field value" keys and "field value description" values.
 */
export declare function getFieldValues(codeType: string): Promise<Record<string, string>>;
/**
 * Determines if a code type - field value combination is valid.
 * @param codeType - A code type.
 * @param possibleFieldValue - A possible field value
 * @returns `true` when the codeType and possibleFieldValue are valid.
 */
export declare function isFieldValue(codeType: string, possibleFieldValue: string): Promise<boolean>;
/**
 * Returns a description of the given field value.
 * @param codeType - A code type.
 * @param fieldValue - A field value.
 * @returns A description of the field value.
 */
export declare function getFieldValueDescription(codeType: string, fieldValue: string): Promise<string | undefined>;
/**
 * Clears memory of cached objects.
 */
export declare function clearObjectCaches(): void;
/**
 * Loads all files into memory.
 * @returns The number of caches loaded.
 */
export declare function loadAllObjectCaches(): Promise<number>;
export * as vmaHelpers from './helpers/vma.js';
