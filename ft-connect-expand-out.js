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
`<ft-connect-expand-out>`

An element that implements a FileThis user workflow as a set of panels that expand out to the right as things progress.

@demo
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/app-route/app-route.js';

import '@filethis/ft-confirmation-dialog/ft-confirmation-dialog.js';
import '@filethis/ft-connect-behavior/ft-connect-behavior.js';
import '@filethis/ft-connection-panel/ft-connection-panel.js';
import '@filethis/ft-document-panel/ft-document-panel.js';
import '@filethis/ft-source-panel/ft-source-panel.js';
import '@filethis/ft-user-interaction-form/ft-user-interaction-form.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/polymer/polymer-legacy.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
        <style include="iron-flex iron-flex-alignment iron-positioning"></style>

        <style>
            :host {
                display: block;
                overflow: hidden;
                @apply --ft-connect-expand-out;
            }
        </style>

        <app-route route="{{route}}" pattern="/:panelName" data="{{_routeData}}">
        </app-route>

        <!-- Vertical layout of header bar and panels-->
        <div class="layout vertical" style="height:493px; ">

            <!-- Horizontal layout of panels-->
            <div id="panels" class="layout horizontal flex">

                <!-- Source Panel -->
                <ft-source-panel id="sourcesPanel" style="width:400px; border: 1px solid black; " sources="[[sources]]" selected-filter-id="{{selectedFilterId}}">
                </ft-source-panel>

                <!-- Spacer -->
                <div style="width:40px; " hidden="[[_hideConnectionsPanel]]">
                </div>

                <!-- Connection Panel -->
                <ft-connection-panel id="connectionsPanel" style="width:433px; border: 1px solid black; " hidden="[[_hideConnectionsPanel]]" connections="[[connections]]" sources="[[sources]]">
                </ft-connection-panel>

                <!-- Spacer -->
                <div style="width:40px; " hidden="[[_hideDocumentPanel]]">
                </div>

                <!-- Document Panel -->
                <ft-document-panel id="documentsPanel" style="border:1px solid black; min-width:200px" hidden="[[_hideDocumentPanel]]" ft-document-panel-show-grid-button="false" ft-document-panel-show-list-button="false" ft-document-panel-show-preview-button="false" ft-document-panel-show-upload-button="false" ft-document-panel-show-download-button="false" ft-document-panel-show-delete-button="false" ft-document-panel-show-document-count="false" documents="[[documents]]">
                </ft-document-panel>
            </div>

        </div>

        <!-- User interaction dialog -->
        <paper-dialog modal="" id="modalInteractionDialog" style="width:450px;
                padding-left: 40px; padding-top: 12px; padding-right: 40px; padding-bottom: 5px;">

            <ft-user-interaction-form id="interactionForm" version="[[interactionVersion]]" request="[[_interactionRequest]]" response="{{_interactionResponse}}" on-submit-response="_onSubmitInteractionResponse" on-button-clicked="_onInteractionFormButtonClicked" style="background:white; border: 1px solid #DDD;">
            </ft-user-interaction-form>

        </paper-dialog>

        <!-- Uploader -->
        <input id="uploader" hidden="" type="file" on-change="_onUploaderFilesChanged" multiple="true" accept="[[_uploadableFileTypes]]">

        <!-- Downloader -->
        <a id="downloader" hidden="" href\$="[[_downloadUrl]]" download\$="[[_downloadFilename]]">
        </a>

        <!-- Confirmation dialog -->
        <ft-confirmation-dialog id="confirmationDialog"></ft-confirmation-dialog>
`,

  is: 'ft-connect-expand-out',

  behaviors: [
      FileThis.ConnectBehavior,
      FileThis.ErrorBehavior,
      FileThis.HttpBehavior // TODO: Why do we have to include these when ConnectBehavior already does?
  ],

  listeners:
  {
      'connections-changed': '_onConnectionsChanged',
      'documents-changed': '_onDocumentsChanged'
  },

  properties: {

      /** Route. */
      route: {
          type: Object,
          notify: true
      },

      _routeData: {
          type: Object,
          observer: "_onRouteDataChanged"
      },

      /** When there are no connections to display, this property is set to false, resulting in the connection panel being hidden. */
      _hideConnectionsPanel: {
          type: Boolean,
          value: true
      },

      /** When there are no documents to display, this property is set to false, resulting in the document panel being hidden. */
      _hideDocumentPanel: {
          type: Boolean,
          value: true
      }
  },

  _onRouteDataChanged: function(to, from)
  {
      if (!this._routeData)
          return;

      // TODO
  },

  _onConnectionsChanged: function()
  {
      var hideConnectionsPanel = (this.connections.length === 0);
      this._hideConnectionsPanel = hideConnectionsPanel;
  },

  _onDocumentsChanged: function()
  {
      var _hideDocumentPanel = (this.documents.length === 0);
      this._hideDocumentPanel = _hideDocumentPanel;
  },

  // User action event handling --------------------------------------------------------------------------

  _onInteractionFormButtonClicked: function(event)
  {
      var detail = event.detail;
      if (detail.action === "defer")
          this.$.modalInteractionDialog.close();
  },

  _onSubmitInteractionResponse: function(event)
  {
      var interactionRequest = this._interactionRequest;
      var interactionResponse = this._interactionResponse;

      var connectionId = interactionRequest.connectionId;
      var interactionId = interactionRequest.id;
      var url = this.server + this.apiPath +
          "/accounts/" + this.account.id +
          "/connections/" + connectionId +
          "/interactions/" + interactionId +
          "/response";
      var options = this._buildHttpOptions();

      return this.httpPut(url, interactionResponse, options)
          .then(function()
          {
              this.$.modalInteractionDialog.close();
          }.bind(this))
          .catch(function(reason)
          {
              this._handleError(reason);
              this.$.modalInteractionDialog.close();
          }.bind(this));
  },

  //            _onSubmitInteractionResponseNew: function(event)
  //            {
  //                var interactionRequest = this._interactionRequest;
  //                var interactionResponse = this._interactionResponse;
  //
  //                var connectionId = interactionRequest.connectionId;
  //                var interactionId = interactionRequest.id;
  //                var url = this.server + this.apiPath +
  //                    "/accounts/" + this.account.id +
  //                    "/connections/" + connectionId +
  //                    "/interactions/" + interactionId +
  //                    "/response";
  //            var options = this._buildHttpOptions();
  //
  //                return this.httpPost(url, interactionResponse, options)
  //                    .then(function()
  //                    {
  //                        this.$.modalInteractionDialog.close();
  //                    }.bind(this))
  //                    .catch(function(reason)
  //                    {
  //                        this._handleError(reason);
  //                        this.$.modalInteractionDialog.close();
  //                    }.bind(this));
  //            },


  poseNextPendingInteractionRequest: function()
  {
      if (this._interactionRequests.length === 0)
          return;

      // If we already have a dialog posed
      if (this.$.modalInteractionDialog.opened)
          return;

      // Pose the first request
      var interactionRequest = this._interactionRequests[0];
      this._interactionRequest = interactionRequest;
      this.$.modalInteractionDialog.open();
      return interactionRequest;
  },

  _poseNextPendingInteractionRequest: function()
  {
      return this.poseNextPendingInteractionRequest();
  },

  pageCodeDropIn:
      "<!-- Put this at the top of your page -->\n" +
      "<link rel=\"import\" href=\"https://connect.filethis.com/ft-connect-expand-out/latest/dropin/ft-connect-expand-out.html\">\n" +
      "\n" +
      "<!-- Put this into the content of your page -->\n" +
      "{{SETTINGS}}" +
      "<{{NAME}}\n" +
      "    user-account-id=\"{{ACCOUNT_ID}}\"\n" +
      "    token=\"{{TOKEN}}\"\n" +
      "    live=\"true\"\n" +
      "    debug=\"true\"\n" +
      "    fake-sources=\"true\">\n" +
      "</{{NAME}}>\n",

  pageCodeCustom:
      "<!-- Put this at the top of your page -->\n" +
      "<link rel=\"import\" href=\"../bower_components/{{NAME}}/{{NAME}}.html\">\n" +
      "\n" +
      "<!-- Put this into the content of your page -->\n" +
      "{{SETTINGS}}" +
      "<{{NAME}}\n" +
      "    user-account-id=\"{{ACCOUNT_ID}}\"\n" +
      "    token=\"{{TOKEN}}\"\n" +
      "    live=\"true\"\n" +
      "    debug=\"true\"\n" +
      "    fake-sources=\"true\">\n" +
      "</{{NAME}}>\n",

  getPageCodeTemplate: function(isDropIn, hasStyling, hasSettingsImports, hasSettingsElements)
  {
      if (isDropIn)  // Drop-In
          return this.pageCodeDropIn;
      else // Custom
          return this.pageCodeCustom;
  }
});
