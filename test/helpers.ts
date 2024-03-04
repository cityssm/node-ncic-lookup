import assert from 'node:assert'

import * as ncicLookup from '../index.js'

const validVmaCodeType = 'Auto'
const invalidVmaCodeType = 'Person'

const invalidFieldValue = 'ZZZ'
const validAutomobileFieldValue = 'GMC'
const validTrailerFieldValue = 'JACK'

describe('vmaHelpers', () => {
  describe('isVmaCodeType()', () => {
    it('Returns true for a valid VMA code types', () => {
      assert.ok(ncicLookup.vmaHelpers.isVmaCodeType(validVmaCodeType))
    })

    it('Returns false for an invalid VMA code types', () => {
      assert.ok(!ncicLookup.vmaHelpers.isVmaCodeType(invalidVmaCodeType))
    })
  })

  describe('getPossibleVmaCodeTypes()', () => {
    it('Returns code types for a valid field type', async () => {
      const codeTypes = await ncicLookup.vmaHelpers.getPossibleVmaCodeTypes(
        validAutomobileFieldValue
      )

      assert.ok(codeTypes.length > 0)
    })

    it('Returns an empty array for an invalid field type', async () => {
      const codeTypes = await ncicLookup.vmaHelpers.getPossibleVmaCodeTypes(
        invalidFieldValue
      )

      assert.ok(codeTypes.length === 0)
    })
  })

  describe('isFieldValueExclusiveToVmaCodeType()', () => {
    it('Returns true for a "Trailer-only" field value', async () => {
      assert.ok(
        await ncicLookup.vmaHelpers.isFieldValueExclusiveToVmaCodeType(
          'Trailers',
          validTrailerFieldValue
        )
      )
    })

    it('Returns false for a field type appearing in multiple code types', async () => {
      assert.ok(
        !(await ncicLookup.vmaHelpers.isFieldValueExclusiveToVmaCodeType(
          'Auto',
          validAutomobileFieldValue
        ))
      )
    })
  })
})
