# NCIC Lookup

[![npm (scoped)](https://img.shields.io/npm/v/%40cityssm/ncic-lookup)](https://www.npmjs.com/package/@cityssm/ncic-lookup)
[![DeepSource](https://app.deepsource.com/gh/cityssm/node-ncic-lookup.svg/?label=active+issues&show_trend=true&token=wV_h2WD2q1m0xm80kHAXVGGC)](https://app.deepsource.com/gh/cityssm/node-ncic-lookup/)
[![Maintainability](https://api.codeclimate.com/v1/badges/1fed08589ce516f0ff69/maintainability)](https://codeclimate.com/github/cityssm/node-ncic-lookup/maintainability)
[![codecov](https://codecov.io/gh/cityssm/node-ncic-lookup/graph/badge.svg?token=8BCT6BZDU8)](https://codecov.io/gh/cityssm/node-ncic-lookup)

Lookups and helper functions for FBI National Crime and Information Center (NCIC) codes.

Built using the XSD file from the [National Information Exchange Model (NEIM) 5.0](https://release.niem.gov/niem/5.0/).

Note that the City of Sault Ste. Marie is using this information for vehicle related lookups in the
[Parking Ticket System](https://github.com/cityssm/parking-ticket-system),
however other lookups are available and are included to increase the reusability of this package.
See the [codeTypes.json file](data/codeTypes.json) for all of the lookups available.

## Installation

```sh
npm install @cityssm/ncic-lookup
```

## Usage

```javascript
import * as ncicLookup from '@cityssm/ncic-lookup'

const codeTypes = await ncicLookup.getCodeTypes()
console.log(Object.keys(codeTypes))
// ["ABRA", "ADD", "Aircraft", ..., "VOW", "VPC", "VST"]

console.log(await ncicLookup.getFieldValueDescription('VMA', 'GMC'))
// "GENERAL MOTORS CORP."

console.log(await ncicLookup.vmaHelpers.getNhtsaCompatibleMake('CHEV'))
// "CHEVROLET"
```
