# oAds [![CircleCI Status](https://circleci.com/gh/Financial-Times/o-ads.svg?style=shield&circle-token=36a37c6ca27a08408c2575c7834f5f6f5c5c9d21)](https://circleci.com/gh/Financial-Times/o-ads/tree/master)

This is an Origami module that enables display advertising from [Googles DFP Ad server](http://www.google.com/dfp), and provides customised demographic, behavioural (via [Krux](http://www.krux.com/)), and contextual (via [Admantx](http://admantx.com/)) targeting.

## Requirements
For basic use, a DFP account with Google is required.  
Each targeting/tracking supplier will require their own configuration and setup.

## Demos
Demos for all ads currently served across ft.com are available in the [Origami Registry](http://registry.origami.ft.com/components/o-ads).

## [Documentation](https://financial-times.github.io/o-ads)
Includes detailed installation and set-up instructions, along with details about the module.

## Developing

### Install & Demos

- To install: `obt install`.
- To run the demos: `obt demo`.
- To run a demo server: `npm run demo-server`

### Tests

The testing setup is unlike other origami components. There are unit tests which we run with karma, and these can be run with `npm run test-unit`

*Browser tests*
We also use Nightwatch and Browserstack to run cross browser tests. To run these:

1. `npm run demo-server` in your terminal. This will compile and launch the demos on http://localhost:3002. *This is needed for the next step to work*
2. `npm run test-browser` will run a local browserstack tunnel and run the tests

## Migration Guide

### Upgrading to v8
- Breaking change: If you use the destroy method on a slots instance, this will now properly destroy the given slots rather than just clear them
- New feature: util event 'off' - remove an event listener

### Upgrading to v9
- Breaking change: o-ads now requires consent before loading Krux or adding custom targeting to the ad calls. Consent can be provided in two ways:

1. Provide a cookie with the name `FTConsent` and specify which consent the user has given as part of the value like this: `behaviouraladsOnsite:on,programmaticadsOnsite:on`
2. Initialise o-ads with the `disableConsentCookie` option.

### Upgrading to v10

- Breaking change: o-ads now defaults to never collapsing empty ads slots following google gpt behavior. 
- Breaking change: collapsing config oAds takes 3 possible options for the `collapseEmpty` attribute: `'before'`, `'after`', `'never'` and defaults to `'never'`
- Breaking change: collapsing ads for a specific slot on the markup now uses  `'before'`, `'after`', `'never'` instead of `true` and `false` previously
- Breaking change: Global collapse empty behavior is set in `config.collapseEmpty` instead of `config.gpt.collapseEmpty` previously

