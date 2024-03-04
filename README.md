# NCIC Lookup

[![DeepSource](https://app.deepsource.com/gh/cityssm/node-ncic-lookup.svg/?label=active+issues&show_trend=true&token=wV_h2WD2q1m0xm80kHAXVGGC)](https://app.deepsource.com/gh/cityssm/node-ncic-lookup/)
[![Maintainability](https://api.codeclimate.com/v1/badges/1fed08589ce516f0ff69/maintainability)](https://codeclimate.com/github/cityssm/node-ncic-lookup/maintainability)
[![codecov](https://codecov.io/gh/cityssm/node-ncic-lookup/graph/badge.svg?token=8BCT6BZDU8)](https://codecov.io/gh/cityssm/node-ncic-lookup)

Lookups and helper functions for FBI National Crime and Information Center (NCIC) codes.

Built using the XSD file from the [National Information Exchange Model (NEIM) 5.0](https://release.niem.gov/niem/5.0/).

## Installation

```sh
npm install @cityssm/ncic-lookup
```

## Usage

```javascript
import * as ncicLookup from '@cityssm/ncic-lookup'

console.log(await ncicLookup.getFieldValueDescription('VMA', 'GMC'))
// "GENERAL MOTORS CORP."
```