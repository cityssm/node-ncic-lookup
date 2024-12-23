import assert from 'node:assert';
import { describe, it } from 'node:test';
import * as ncicLookup from '../index.js';
const validCodeType = 'VMA';
const invalidCodeType = 'X';
const validFieldValue = 'GMC';
const invalidFieldValue = 'ZZZ';
await describe('ncic-lookup', async () => {
    await it('Loads all of the caches', async () => {
        const cacheCount = await ncicLookup.loadAllObjectCaches();
        assert.ok(cacheCount > 0);
    });
    await it('Clears object caches', () => {
        ncicLookup.clearObjectCaches();
        assert.ok(true);
    });
    await it('Loads code types', () => {
        const codeTypes = ncicLookup.getCodeTypes();
        assert(Object.keys(codeTypes).length > 0);
    });
    await describe('isCodeType()', async () => {
        await it('Returns true for a valid code type', () => {
            assert.ok(ncicLookup.isCodeType(validCodeType));
        });
        await it('Returns false for an invalid code type', () => {
            assert.ok(!ncicLookup.isCodeType(invalidCodeType));
        });
    });
    await describe('getCodeTypeDescription()', async () => {
        await it('Returns a string for a valid code type', () => {
            assert.strictEqual(typeof ncicLookup.getCodeTypeDescription(validCodeType), 'string');
        });
        await it('Returns undefined for an invalid code type', () => {
            assert.ok(typeof ncicLookup.getCodeTypeDescription(invalidCodeType), 'undefined');
        });
    });
    await describe('getFieldValues()', async () => {
        await it('Returns an object for a valid code type', async () => {
            assert.ok(Object.keys(await ncicLookup.getFieldValues(validCodeType)).length > 0);
        });
        await it('Returns an empty object for an invalid code type', async () => {
            assert.ok(Object.keys(await ncicLookup.getFieldValues(invalidCodeType)).length ===
                0);
        });
    });
    await describe('isFieldValue()', async () => {
        await it('Returns true for a valid code type - field value', async () => {
            assert.ok(await ncicLookup.isFieldValue(validCodeType, validFieldValue));
        });
        await it('Returns false for an invalid code type - field value', async () => {
            assert.ok(!(await ncicLookup.isFieldValue(invalidCodeType, invalidFieldValue)));
        });
        await it('Returns false for a valid code type - invalid field value', async () => {
            assert.ok(!(await ncicLookup.isFieldValue(validCodeType, invalidFieldValue)));
        });
    });
    await describe('getFieldValueDescription()', async () => {
        await it('Returns a string for a valid code type - field value', async () => {
            assert.strictEqual(typeof (await ncicLookup.getFieldValueDescription(validCodeType, validFieldValue)), 'string');
        });
        await it('Returns undefined for an invalid code type - field value', async () => {
            assert.strictEqual(typeof (await ncicLookup.getFieldValueDescription(invalidCodeType, invalidFieldValue)), 'undefined');
        });
        await it('Returns undefined for a valid code type - invalid field value', async () => {
            assert.strictEqual(typeof (await ncicLookup.getFieldValueDescription(validCodeType, invalidFieldValue)), 'undefined');
        });
    });
});
