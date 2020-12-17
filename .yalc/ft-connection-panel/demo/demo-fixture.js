/*
Copyright 2018 FileThis, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/* ft-connection-panel element demo */
/* Imports */
/**

An element that displays a list of FileThis connection resources

@demo
 */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/

import 'ft-connection-list-item/ft-connection-list-item-settings.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/polymer/polymer-legacy.js';
import '../ft-connection-panel.js';
import '../ft-connection-panel-settings.js';
import './ft-connection-panel-settings-editor.js';
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

        <!-- Set a couple settings -->

        <ft-connection-panel-settings ft-connection-panel-heading="These are your connections">
        </ft-connection-panel-settings>

        <ft-connection-list-item-settings ft-connection-list-item-allow-manual-fetch="true">
        </ft-connection-list-item-settings>

        <ft-element-demo name="ft-connection-panel" show-config="true" style="width:100%; height: 100%; ">
            <!-- Settings -->
            <ft-connection-panel-settings-editor slot="config" style="height:100%; padding:20px; " ft-connection-panel-show-heading="{{ftConnectionPanelShowHeading}}" ft-connection-panel-heading="{{ftConnectionPanelHeading}}" ft-connection-panel-show-delete-button="{{ftConnectionPanelShowDeleteButton}}">
            </ft-connection-panel-settings-editor>

            <!-- Panel -->
            <ft-connection-panel slot="instance" id="panel" style="width:100%; height: 100%; background-color: white; " ft-connection-panel-show-heading="{{ftConnectionPanelShowHeading}}" ft-connection-panel-heading="{{ftConnectionPanelHeading}}" ft-connection-panel-show-delete-button="{{ftConnectionPanelShowDeleteButton}}">
            </ft-connection-panel>

        </ft-element-demo>
`,

  is: 'demo-fixture',

  ready: function()
  {
      this._loadFakeSources();
  },

  _loadFakeSources: function()
  {
      var path = "fake-sources.json";

      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.overrideMimeType("application/json");
      xmlHttpRequest.open('GET', path, true);
      xmlHttpRequest.onreadystatechange = function()
      {
          if (xmlHttpRequest.readyState === 4 &&
              xmlHttpRequest.status === 200)
          {
              var sources = JSON.parse(xmlHttpRequest.responseText);
              this.$.panel.sources = sources;

              this._loadFakeConnections();
          }
      }.bind(this);
      xmlHttpRequest.send();
  },

  _loadFakeConnections: function()
  {
      var path = "fake-connections.json";

      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.overrideMimeType("application/json");
      xmlHttpRequest.open('GET', path, true);
      xmlHttpRequest.onreadystatechange = function()
      {
          if (xmlHttpRequest.readyState === 4 &&
              xmlHttpRequest.status === 200)
          {
              var connections = JSON.parse(xmlHttpRequest.responseText);
              this.$.panel.connections = connections;
          }
      }.bind(this);
      xmlHttpRequest.send();
  }
});
