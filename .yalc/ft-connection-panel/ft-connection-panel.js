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
/**
`<ft-connection-panel>`

This element displays a list of FileThis connection resources. Above the list is a header area that can display a heading and a delete button. Which header elements are displayed is configurable.

@demo
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import 'ft-confirmation-dialog/ft-confirmation-dialog.js';

import 'ft-connection-list/ft-connection-list.js';
import 'ft-connection-list-item/ft-connection-list-item-settings-behavior.js';
import './ft-connection-panel-settings-behavior.js';
import 'ft-labeled-icon-button/ft-labeled-icon-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-label/iron-label.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/polymer/polymer-legacy.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
Polymer({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning"></style>

        <style>
            :host {
                display: block;
                overflow: hidden;
                @apply --layout-vertical;
                @apply --ft-connection-panel;
            }
            #header {
                height: 60px;
                min-height: 60px;
                padding-left: 16px;
                padding-right: 10px;
                border-bottom: 1px solid #DDD;
                @apply --ft-connection-panel-header;
            }
            #heading {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14pt;
                @apply --ft-connection-panel-heading;
            }
        </style>

        <!-- Header -->
        <div id="header" class="layout horizontal center" hidden\$="[[!_showHeader]]">
            <!-- Heading -->
            <iron-label id="heading" hidden\$="[[!ftConnectionPanelShowHeading]]">
                [[ftConnectionPanelHeading]]
            </iron-label>

            <div class="flex"></div>

            <!-- Delete button -->
            <ft-labeled-icon-button id="deleteButton" icon="delete" label="Delete" disabled="[[!selectedConnection]]" hidden\$="[[!ftConnectionPanelShowDeleteButton]]" on-tap="_onDeleteButtonClicked">
            </ft-labeled-icon-button>
        </div>

        <!-- List -->
        <ft-connection-list id="connectionList" class="flex" connections="[[connections]]" selected-connection="{{selectedConnection}}" ft-connection-list-item-allow-manual-fetch="{{ftConnectionListItemAllowManualFetch}}" ft-connection-list-item-show-document-count="{{ftConnectionListItemShowDocumentCount}}">
        </ft-connection-list>

        <!-- Confirmation dialog -->
        <ft-confirmation-dialog id="confirmationDialog"></ft-confirmation-dialog>
`,

  is: 'ft-connection-panel',

  behaviors: [
      FileThis.ConnectionPanelSettingsBehavior,
      FileThis.ConnectionListItemSettingsBehavior,
      IronResizableBehavior,
  ],

  observers:
  [
      "_onSettingsPropertyChanged(ftConnectionPanelHeading, ftConnectionPanelShowHeading, ftConnectionPanelShowDeleteButton)"
  ],

  /**
   * Fired when the "Delete" button is clicked.
   *
   * @event delete
   * @param {Object} connection The selected connection to be deleted.
   */

  properties: {

      /** The list of connection resources to be displayed. */
      connections:
      {
          type: Array,
          notify: true,
          value: []
      },

      /** The currently-selected connection, if any. */
      selectedConnection:
      {
          type: Object,
          notify: true,
          value: null
      },

      /** The list of all sources. This is used to display source-specific properties for each connection. */
      sources:
      {
          type: Array,
          notify: true,
          value: []
      },

      /** True when at least one of the header widgets is displayed. When false, the header is hidden. */
      _showHeader:
      {
          type: Boolean,
          value: true
      },

  },

  _showButtonChanged: function(to, from)
  {
      this._showHeader = this._canShowHeader();
      this.notifyResize();
  },

  _canShowHeader: function()
  {
      if (this.ftConnectionPanelShowHeading)
          return true;
      if (this.ftConnectionPanelShowDeleteButton)
          return true;
      return false;
  },

  _onDeleteButtonClicked: function(event)
  {
      var overrideWarning = event.metaKey;
      if (overrideWarning)
      {
          this.fire('delete-connection-command', this.selectedConnection);
          return;
      }

      var prompt = "Are you sure you want to delete the selected connection?";
      return this.$.confirmationDialog.confirm(prompt, "Delete Connection")
          .then(function(choice)
          {
              if (choice === "cancel")
                  return;
              this.fire('delete-connection-command', this.selectedConnection);
          }.bind(this))
  },

  _onSettingsPropertyChanged: function()
  {
      this._showButtonChanged();

      this.fire("settings-property-changed");
  }
});
