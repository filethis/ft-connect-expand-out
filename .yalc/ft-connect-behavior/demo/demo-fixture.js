/* ft-connect-behavior element demo */
/* Imports */
/**

An element that handles most of the business logic needed by FileThis Connect element variations.

@demo
 */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/

import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/polymer/polymer-legacy.js';
import '../ft-connect-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer
({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning"></style>

        <style>
            :host {
                display: block;
                overflow: hidden;
           }
        </style>

        <ft-connect-behavior fake-data="true">
        </ft-connect-behavior>
`,

  is: 'demo-fixture',

  properties:
  {
  }
});
