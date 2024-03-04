export declare const vmaCodeType = "VMA";
export declare const specificVmaCodeTypes: readonly ["Aircraft", "Auto", "Construction", "Farm", "Motorcycle", "Snowmobile", "Trucks", "Trailers"];
/**
 * Determines if a code type is a VMA code type.
 * @param {string} possibleVmaCodeType - A possible code type
 * @returns {boolean} - True when the code type is a VMA code type.
 */
export declare function isVmaCodeType(possibleVmaCodeType: string): possibleVmaCodeType is (typeof specificVmaCodeTypes)[number];
/**
 * Returns a list of code types for a given field type.
 * @param {string} vmaFieldValue - A field type associated with a VMA code type.
 * @returns {string[]} - A list of code types that include the given field type.
 */
export declare function getPossibleVmaCodeTypes(vmaFieldValue: string): Promise<Array<(typeof specificVmaCodeTypes)[number]>>;
/**
 * Determines if a field value is exclusive to a specific code type.
 * @param {string} vmaCodeType - A code type.
 * @param {string} vmaFieldValue - A field value.
 * @returns {boolean} - True if the field value only appears under the given code type.
 */
export declare function isFieldValueExclusiveToVmaCodeType(vmaCodeType: (typeof specificVmaCodeTypes)[number], vmaFieldValue: string): Promise<boolean>;
