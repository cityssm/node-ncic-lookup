export declare const vmaCodeType = "VMA";
export declare const specificVmaSubCodeTypes: ["Aircraft", "Construction", "Farm", "Motorcycle", "Snowmobile", "Trucks", "Trailers"];
/**
 * Determines if a code type is a VMA code type.
 * @param possibleVmaCodeType - A possible subcode type
 * @returns - True when the code type is a VMA code type.
 */
export declare function isVmaCodeType(possibleVmaCodeType: string): possibleVmaCodeType is (typeof specificVmaSubCodeTypes)[number];
/**
 * Returns a list of code types for a given field type.
 * @param vmaFieldValue - A field value associated with a VMA code type.
 * @returns - A list of code types that include the given field type.
 */
export declare function getPossibleVmaSubCodeTypes(vmaFieldValue: string): Promise<Array<(typeof specificVmaSubCodeTypes)[number]>>;
/**
 * Determines if a field value is exclusive to a specific subcode type.
 * @param vmaCodeType - A code type.
 * @param vmaFieldValue - A field value.
 * @returns - True if the field value only appears under the given code type.
 */
export declare function isFieldValueExclusiveToVmaSubCodeType(vmaCodeType: (typeof specificVmaSubCodeTypes)[number], vmaFieldValue: string): Promise<boolean>;
/**
 * Returns a NHTSA-compatible vehicle make if available.
 * @param vmaFieldValue - A field value associated with a VMA code type.
 * @returns - A NHTSA-compatible description if available, otherwise the field description.
 */
export declare function getNhtsaCompatibleMake(vmaFieldValue: string): Promise<string | undefined>;
