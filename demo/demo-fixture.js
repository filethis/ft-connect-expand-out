/* ft-connect-expand-out element demo */
/* Imports */
/**

A drop-in HTML 5 element that quickly, securely, and flexibly integrates your application with the FileThis API.

@demo
 */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/

import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/polymer/polymer-legacy.js';
import '../ft-connect-expand-out.js';
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

        <div class="layout vertical center center-justified" style="width:100%; height: 100%; ">

            <ft-connect-expand-out id="component" fake-data="true" debug="true">
            </ft-connect-expand-out>
        </div>
`,

  is: 'demo-fixture',

  ready: function()
  {
      this.$.component.getAllData();
  }
});
