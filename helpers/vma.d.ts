import { type ValidCodeTypes } from '../index.js';
export declare const vmaCodeType = "VMA";
export declare const specificVmaSubCodeTypes: ValidCodeTypes[];
/**
 * Determines if a code type is a VMA code type.
 * @param {string} possibleVmaCodeType - A possible subcode type
 * @returns {boolean} - True when the code type is a VMA code type.
 */
export declare function isVmaCodeType(possibleVmaCodeType: string): possibleVmaCodeType is (typeof specificVmaSubCodeTypes)[number];
/**
 * Returns a list of code types for a given field type.
 * @param {string} vmaFieldValue - A field value associated with a VMA code type.
 * @returns {string[]} - A list of code types that include the given field type.
 */
export declare function getPossibleVmaSubCodeTypes(vmaFieldValue: string): Promise<Array<(typeof specificVmaSubCodeTypes)[number]>>;
/**
 * Determines if a field value is exclusive to a specific subcode type.
 * @param {string} vmaCodeType - A code type.
 * @param {string} vmaFieldValue - A field value.
 * @returns {boolean} - True if the field value only appears under the given code type.
 */
export declare function isFieldValueExclusiveToVmaSubCodeType(vmaCodeType: (typeof specificVmaSubCodeTypes)[number], vmaFieldValue: string): Promise<boolean>;
/**
 * Returns a NHTSA-compatible vehicle make if available.
 * @param {string} vmaFieldValue - A field value associated with a VMA code type.
 * @returns {string} - A NHTSA-compatible description if available, otherwise the field description.
 */
export declare function getNhtsaCompatibleMake(vmaFieldValue: string): Promise<string | undefined>;
