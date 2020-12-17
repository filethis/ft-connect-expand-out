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
/* ft-document-panel element demo */
/* Imports */
/**

A panel that displays a list of FileThis documents

@demo
 */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/

import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/polymer/polymer-legacy.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import '../ft-document-panel.js';
import '../ft-document-panel-settings.js';
import './ft-document-panel-settings-editor.js';
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
            }
        </style>

        <!-- Set a couple settings -->
        <ft-document-panel-settings ft-document-panel-heading="These are your documents" ft-document-panel-show-download-button="false">
        </ft-document-panel-settings>

        <ft-element-demo name="ft-document-panel" class="flex" show-config="true">
            <!-- Settings -->
            <ft-document-panel-settings-editor slot="config" style="height:100%; padding:20px; " ft-document-panel-show-heading="{{ftDocumentPanelShowHeading}}" ft-document-panel-heading="{{ftDocumentPanelHeading}}" ft-document-panel-show-grid-button="{{ftDocumentPanelShowGridButton}}" ft-document-panel-show-list-button="{{ftDocumentPanelShowListButton}}" ft-document-panel-view-as-initial="{{ftDocumentPanelViewAsInitial}}" ft-document-panel-show-preview-button="{{ftDocumentPanelShowPreviewButton}}" ft-document-panel-show-upload-button="{{ftDocumentPanelShowUploadButton}}" ft-document-panel-show-download-button="{{ftDocumentPanelShowDownloadButton}}" ft-document-panel-show-delete-button="{{ftDocumentPanelShowDeleteButton}}" ft-document-panel-show-document-count="{{ftDocumentPanelShowDocumentCount}}">
            </ft-document-panel-settings-editor>

            <!-- Panel -->
            <ft-document-panel slot="instance" id="panel" style="width:100%; height: 100%; " ft-document-panel-show-heading="{{ftDocumentPanelShowHeading}}" ft-document-panel-heading="{{ftDocumentPanelHeading}}" ft-document-panel-show-grid-button="{{ftDocumentPanelShowGridButton}}" ft-document-panel-show-list-button="{{ftDocumentPanelShowListButton}}" ft-document-panel-view-as-initial="{{ftDocumentPanelViewAsInitial}}" ft-document-panel-show-preview-button="{{ftDocumentPanelShowPreviewButton}}" ft-document-panel-show-upload-button="{{ftDocumentPanelShowUploadButton}}" ft-document-panel-show-download-button="{{ftDocumentPanelShowDownloadButton}}" ft-document-panel-show-delete-button="{{ftDocumentPanelShowDeleteButton}}" ft-document-panel-show-document-count="{{ftDocumentPanelShowDocumentCount}}">
            </ft-document-panel>

        </ft-element-demo>
`,

  is: 'demo-fixture',

  ready: function()
  {
      this._loadFakeDocuments();
  },

  _loadFakeDocuments: function()
  {
      var path = "fake-documents.json";

      var xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.overrideMimeType("application/json");
      xmlHttpRequest.open('GET', path, true);
      xmlHttpRequest.onreadystatechange = function()
      {
          if (xmlHttpRequest.readyState === 4 &&
              xmlHttpRequest.status === 200)
          {
              var documents = xmlHttpRequest.responseText;
              this.$.panel.documents = JSON.parse(documents);
          }
      }.bind(this);
      xmlHttpRequest.send();
  }
});
