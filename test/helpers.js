import assert from 'node:assert';
import { describe, it } from 'node:test';
import * as ncicLookup from '../index.js';
const validVmaCodeType = 'Trucks';
const invalidVmaCodeType = 'Person';
const invalidFieldValue = 'ZZZ';
const validAutomobileFieldValue = 'GMC';
const validTrailerFieldValue = 'JACK';
const nhtsaOverwrittenFieldValue = 'JEEP';
const nhtsaNonOverwrittenFieldValue = 'CHEV';
await describe('vmaHelpers', async () => {
    await describe('isVmaCodeType()', async () => {
        await it('Returns true for a valid VMA code types', () => {
            assert.ok(ncicLookup.vmaHelpers.isVmaCodeType(validVmaCodeType));
        });
        await it('Returns false for an invalid VMA code types', () => {
            assert.ok(!ncicLookup.vmaHelpers.isVmaCodeType(invalidVmaCodeType));
        });
    });
    await describe('getPossibleVmaSubCodeTypes()', async () => {
        await it('Returns code types for a valid field type', async () => {
            const codeTypes = await ncicLookup.vmaHelpers.getPossibleVmaSubCodeTypes(validAutomobileFieldValue);
            assert.ok(codeTypes.length > 0);
        });
        await it('Returns an empty array for an invalid field type', async () => {
            const codeTypes = await ncicLookup.vmaHelpers.getPossibleVmaSubCodeTypes(invalidFieldValue);
            assert.ok(codeTypes.length === 0);
        });
    });
    // eslint-disable-next-line no-secrets/no-secrets
    await describe('isFieldValueExclusiveToVmaSubCodeType()', async () => {
        await it('Returns true for a "Trailer-only" field value', async () => {
            assert.ok(await ncicLookup.vmaHelpers.isFieldValueExclusiveToVmaSubCodeType('Trailers', validTrailerFieldValue));
        });
        await it('Returns false for a field type appearing in multiple code types', async () => {
            assert.ok(!(await ncicLookup.vmaHelpers.isFieldValueExclusiveToVmaSubCodeType('Trucks', validAutomobileFieldValue)));
        });
    });
    await describe('getNhtsaCompatibleMake', async () => {
        await it('Returns a NHTSA-compatible make if available', async () => {
            const regularValue = await ncicLookup.getFieldValueDescription('VMA', nhtsaOverwrittenFieldValue);
            const nhtsaValue = ncicLookup.vmaHelpers.getNhtsaCompatibleMake(nhtsaOverwrittenFieldValue);
            assert.notStrictEqual(regularValue, nhtsaValue);
        });
        await it('Returns regular field description if no NHTSA value available', async () => {
            const regularValue = await ncicLookup.getFieldValueDescription('VMA', nhtsaNonOverwrittenFieldValue);
            const nhtsaValue = ncicLookup.vmaHelpers.getNhtsaCompatibleMake(nhtsaNonOverwrittenFieldValue);
            assert.notEqual(regularValue, nhtsaValue);
        });
    });
});
