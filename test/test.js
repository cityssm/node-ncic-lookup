import assert from 'node:assert';
import * as ncicLookup from '../index.js';
const validCodeType = 'VMA';
const invalidCodeType = 'X';
const validFieldValue = 'GMC';
const invalidFieldValue = 'ZZZ';
describe('ncic-lookup', () => {
    it('Loads all of the caches', async () => {
        const cacheCount = await ncicLookup.loadAllObjectCaches();
        assert.ok(cacheCount > 0);
    });
    it('Clears object caches', () => {
        ncicLookup.clearObjectCaches();
        assert.ok(true);
    });
    it('Loads code types', async () => {
        const codeTypes = await ncicLookup.getCodeTypes();
        assert(Object.keys(codeTypes).length > 0);
    });
    describe('isCodeType()', () => {
        it('Returns true for a valid code type', async () => {
            assert.ok(await ncicLookup.isCodeType(validCodeType));
        });
        it('Returns false for an invalid code type', async () => {
            assert.ok(!(await ncicLookup.isCodeType(invalidCodeType)));
        });
    });
    describe('getCodeTypeDescription()', () => {
        it('Returns a string for a valid code type', async () => {
            assert.strictEqual(typeof (await ncicLookup.getCodeTypeDescription(validCodeType)), 'string');
        });
        it('Returns undefined for an invalid code type', async () => {
            assert.ok(typeof (await ncicLookup.getCodeTypeDescription(invalidCodeType)), 'undefined');
        });
    });
    describe('getFieldValues()', () => {
        it('Returns an object for a valid code type', async () => {
            assert.ok(Object.keys(await ncicLookup.getFieldValues(validCodeType)).length > 0);
        });
        it('Returns an empty object for an invalid code type', async () => {
            assert.ok(Object.keys(await ncicLookup.getFieldValues(invalidCodeType)).length ===
                0);
        });
    });
    describe('isFieldValue()', () => {
        it('Returns true for a valid code type - field value', async () => {
            assert.ok(await ncicLookup.isFieldValue(validCodeType, validFieldValue));
        });
        it('Returns false for an invalid code type - field value', async () => {
            assert.ok(!(await ncicLookup.isFieldValue(invalidCodeType, invalidFieldValue)));
        });
        it('Returns false for a valid code type - invalid field value', async () => {
            assert.ok(!(await ncicLookup.isFieldValue(validCodeType, invalidFieldValue)));
        });
    });
    describe('getFieldValueDescription()', () => {
        it('Returns a string for a valid code type - field value', async () => {
            assert.strictEqual(typeof (await ncicLookup.getFieldValueDescription(validCodeType, validFieldValue)), 'string');
        });
        it('Returns undefined for an invalid code type - field value', async () => {
            assert.strictEqual(typeof (await ncicLookup.getFieldValueDescription(invalidCodeType, invalidFieldValue)), 'undefined');
        });
        it('Returns undefined for a valid code type - invalid field value', async () => {
            assert.strictEqual(typeof (await ncicLookup.getFieldValueDescription(validCodeType, invalidFieldValue)), 'undefined');
        });
    });
});
