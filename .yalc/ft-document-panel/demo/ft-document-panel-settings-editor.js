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
/* Imports */
/**

This element defines a source grid example that allows experimentation with configuration.

@demo
 */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';

import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/polymer/lib/elements/custom-style.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import '../ft-document-panel-settings-behavior.js';
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
                @apply --layout-vertical;
                @apply --ft-document-panel-settings-editor;
            }
        </style>

        <custom-style>
            <style>
                paper-checkbox {
                    width: 165px;
                    margin-bottom: 16px;
                }
            </style>
        </custom-style>

        <!-- Settings -->
        <paper-checkbox checked="{{ftDocumentPanelShowHeading}}">
            Show Heading
        </paper-checkbox>

        <paper-input id="headingField" value="{{ftDocumentPanelHeading}}" label="Heading:" style="width:200px;">
        </paper-input>

        <div style="height:20px"></div>

        <paper-checkbox checked="{{ftDocumentPanelShowGridButton}}">
            Show Grid Button
        </paper-checkbox>

        <paper-checkbox checked="{{ftDocumentPanelShowListButton}}">
            Show List Button
        </paper-checkbox>

        <paper-checkbox checked="{{ftDocumentPanelShowPreviewButton}}">
            Show Preview Button
        </paper-checkbox>

        <paper-checkbox checked="{{ftDocumentPanelShowUploadButton}}">
            Show Upload Button
        </paper-checkbox>

        <paper-checkbox checked="{{ftDocumentPanelShowDownloadButton}}" style="width:190px; ">
            Show Download Button
        </paper-checkbox>

        <paper-checkbox checked="{{ftDocumentPanelShowDeleteButton}}">
            Show Delete Button
        </paper-checkbox>

        <paper-checkbox checked="{{ftDocumentPanelShowDocumentCount}}" style="width:190px; ">
            Show Document Count
        </paper-checkbox>

        <!-- View as menu -->
        <paper-dropdown-menu id="viewAsMenu" label="Initially View As" style="width:85px; margin-bottom: 0; " no-animations="true">
            <paper-listbox class="dropdown-content" slot="dropdown-content" selected="{{_initialViewAsIndex}}">
                <paper-item>Grid</paper-item>
                <paper-item>List</paper-item>
            </paper-listbox>
        </paper-dropdown-menu>
`,

  is: 'ft-document-panel-settings-editor',
  behaviors: [FileThis.DocumentPanelSettingsBehavior],

  listeners:
      {
          'ft-document-panel-view-as-initial-changed-in-behavior': '_onFtDocumentPanelViewAsInitialChangedInBehavior',
      },

  properties:
      {
          _initialViewAsIndex:
              {
                  type: Number,
                  value: 0,
                  notify: true,
                  observer: "_onInitialViewAsIndexChanged",
              },
      },

  _onInitialViewAsIndexChanged: function(to, from)
  {
      switch (this._initialViewAsIndex)
      {
          case 0:
              this.ftDocumentPanelViewAsInitial = "grid";
              break;
          case 1:
              this.ftDocumentPanelViewAsInitial = "list";
              break;
      }
  },

  _onFtDocumentPanelViewAsInitialChangedInBehavior: function()
  {
      switch (this.ftDocumentPanelViewAsInitial)
      {
          case "grid":
              this._initialViewAsIndex = 0;
              break;
          case "list":
              this._initialViewAsIndex = 1;
              break;
      }
  }
});
