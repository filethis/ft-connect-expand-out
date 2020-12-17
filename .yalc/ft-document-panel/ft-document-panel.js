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
`<ft-document-panel>`

This element displays a list of FileThis document resources. Above the list is a header area that can display a title and several buttons that affect how the document items are displayed, or operate on the selected documents. Which header elements are displayed is configurable.

@demo
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import 'ft-confirmation-dialog/ft-confirmation-dialog.js';

import 'ft-document-grid/ft-document-grid.js';
import 'ft-document-list/ft-document-list.js';
import './ft-document-panel-settings-behavior.js';
import 'ft-labeled-icon-button/ft-labeled-icon-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
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
                @apply --layout-vertical;
                @apply --ft-document-panel;
            }
            .heading {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14pt;
                @apply --ft-document-panel-heading;
            }
            .button-bar {
                height: 60px;
                padding-left: 16px;
                padding-right: 15px;
                border-bottom: 1px solid #DDD;
                @apply --ft-document-panel-button-bar;
            }
            .button {
                margin-right: 5px;
                @apply --ft-document-panel-button;
            }
            .document-count {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14pt;
                @apply --ft-document-panel-document-count;
            }
            .views {
                background-color: white;
                @apply --ft-document-panel-views;
            }
            .preview {
                @apply --ft-document-panel-preview;
            }
        </style>

        <!-- Button bar -->
        <div id="buttonBar" class="button-bar layout horizontal center" hidden\$="[[!_showButtonBar]]">
            <!-- Heading -->
            <iron-label class="heading" hidden\$="[[!ftDocumentPanelShowHeading]]">
                [[ftDocumentPanelHeading]]
            </iron-label>

            <!-- Heading spacer -->
            <div style\$="width:[[_headingSpacerWidth]]px;&quot;"></div>

            <!-- Grid button -->
            <ft-labeled-icon-button id="defaultServerButton" class="button" icon="apps" label="Grid" hidden\$="[[!ftDocumentPanelShowGridButton]]" on-tap="_onViewAsGridButtonClicked">
            </ft-labeled-icon-button>

            <!-- List button -->
            <ft-labeled-icon-button id="listButton" class="button" icon="view-headline" label="List" hidden\$="[[!ftDocumentPanelShowListButton]]" on-tap="_onViewAsListButtonClicked">
            </ft-labeled-icon-button>

            <!-- Preview button -->
            <ft-labeled-icon-button id="previewButton" class="button" icon="visibility" label="Preview" disabled="[[!_haveSelection]]" hidden\$="[[!ftDocumentPanelShowPreviewButton]]" on-tap="_onPreviewButtonClicked">
            </ft-labeled-icon-button>

            <!-- View button group spacer -->
            <div style\$="width:[[_viewButtonGroupSpacerWidth]]px;&quot;"></div>

            <!-- Upload button -->
            <ft-labeled-icon-button id="uploadButton" class="button" icon="file-upload" label="Upload" hidden\$="[[!ftDocumentPanelShowUploadButton]]" on-tap="_onUploadButtonClicked">
            </ft-labeled-icon-button>

            <!-- Download button -->
            <ft-labeled-icon-button id="downloadButton" class="button" icon="file-download" label="Down" disabled="[[!_haveSelection]]" hidden\$="[[!ftDocumentPanelShowDownloadButton]]" on-tap="_onDownloadButtonClicked">
            </ft-labeled-icon-button>

            <!-- Upload/download button group spacer -->
            <div style\$="width:[[_uploadDownloadButtonGroupSpacerWidth]]px;&quot;"></div>

            <!-- Delete button -->
            <ft-labeled-icon-button id="deleteButton" class="button" icon="delete" label="Delete" disabled="[[!_haveSelection]]" hidden\$="[[!ftDocumentPanelShowDeleteButton]]" on-tap="_onDeleteButtonClicked">
            </ft-labeled-icon-button>

            <!-- Upload/download button group spacer -->
            <div style\$="width:20px;&quot;"></div>

            <!-- Document count -->
            <iron-label id="documentCount" class="document-count" hidden\$="[[!ftDocumentPanelShowDocumentCount]]">
                [[documentCount]]
            </iron-label>

            <div class="flex"></div>
            <div style="width:25px;"></div>

            <!-- Details button -->
            <!--<ft-labeled-icon-button-->
                    <!--id="detailsButton"-->
                    <!--icon="info-outline"-->
                    <!--label="Details"-->
                    <!--disabled="[[!_haveSelection]]"-->
                    <!--on-tap="_onShowDetailsButtonClicked">-->
            <!--</ft-labeled-icon-button>-->
        </div>

        <!-- Views -->
        <iron-pages id="views" class="views flex layout vertical" attr-for-selected="id" selected="[[selectedView]]">
            <!-- Grid -->
            <ft-document-grid id="grid" class="flex" documents="[[documents]]" selected-document="{{selectedDocument}}">
            </ft-document-grid>

            <!-- List -->
            <ft-document-list id="list" class="flex" documents="[[documents]]" selected-document="{{selectedDocument}}">
            </ft-document-list>

            <!-- Preview -->
            <div id="preview" class="preview flex layout vertical center">
                <div style="height:100px;"></div>

                <iron-label style="font-size:24pt">
                    Document preview is coming soon
                </iron-label>

                <div style="height:100px;"></div>
            </div>

        </iron-pages>

        <!-- Confirmation dialog -->
        <ft-confirmation-dialog id="confirmationDialog"></ft-confirmation-dialog>
`,

  is: 'ft-document-panel',

  /**
   * Fired when the "Download" button is clicked.
   *
   * @event download
   * @param {Object} document The selected document whose file the user wants to download.
   */

  /**
   * Fired when the "Upload" button is clicked.
   *
   * @event upload
   */

  /**
   * Fired when the "Delete" button is clicked.
   *
   * @event delete
   * @param {Object} document The selected document to be deleted.
   */

  /**
   * Fired when the "Show Details" button is clicked.
   *
   * @event show-details
   */

  behaviors: [FileThis.DocumentPanelSettingsBehavior],

  observers:
  [
      "_onSettingsPropertyChanged(ftDocumentPanelShowHeading, ftDocumentPanelHeading, ftDocumentPanelShowGridButton, ftDocumentPanelShowListButton, ftDocumentPanelShowPreviewButton, ftDocumentPanelShowUploadButton, ftDocumentPanelShowDownloadButton, ftDocumentPanelShowDeleteButton, ftDocumentPanelShowDocumentCount)"
  ],

  listeners:
      {
          'ft-document-panel-view-as-initial-changed-in-behavior': '_onFtDocumentPanelViewAsInitialChangedInBehavior',
      },

  properties: {

      /** The list of documents resources to be displayed. */
      documents:
      {
          type: Array,
          notify: true,
          value: [],
          observer: "_documentsChanged"
      },

      /** The currently-selected document, if any. */
      selectedDocument:
      {
          type: Object,
          notify: true,
          value: null,
          observer: "_selectedDocumentChanged"
      },

      /** The total number of documents. */
      documentCount:
      {
          type: Number,
          notify: true,
          value: 0
      },

      /** The currently-selected view of the document(s). Must be one of: "grid", "list", "preview". */
      selectedView:
      {
          type: String,
          notify: true,
          value: "grid"
      },

      /** The FileThis ticket. Used for uploads. */
      ticket:
      {
          type: String,
          value: ""
      },

      /** True when at least one of the header widgets is displayed. When false, the header is hidden. */
      _showButtonBar:
      {
          type: Boolean,
          value: true
      },

      /** Horizontal space to use between the heading and any buttons that follow to the right. */
      _headingSpacerWidth:
      {
          type: Number,
          value: 30
      },

      /** Horizontal space to use between the last view-type button and any buttons that follow to the right. */
      _viewButtonGroupSpacerWidth:
      {
          type: Number,
          value: 30
      },

      /** Horizontal space to use between the last upload/download button and any buttons that follow to the right. */
      _uploadDownloadButtonGroupSpacerWidth:
      {
          type: Number,
          value: 30
      },

      /** True if any document is selected. Used to enable/disable buttons that can operate on a selection. */
      _haveSelection:
      {
          type: Boolean,
          value: false
      },

  },

  _onFtDocumentPanelViewAsInitialChangedInBehavior: function()
  {
      var viewAs = this.ftDocumentPanelViewAsInitial;
      this.selectedView = viewAs;
  },

  _documentsChanged: function(to, from)
  {
      // Man, this is fugly...
      // TODO: This can probably be replaced by a resize message sent to the iron-pages
      this._fixGrid();
//                this.$.documentGrid.fire('resize');
//                this.$.documentList.fire('resize');

      var documentCount = 0;
      if (!!this.documents)
          documentCount = this.documents.length;
      this.documentCount = documentCount;
  },

  _fixGrid: function()
  {
      var currentSelectedViewId = this.selectedView;
      var tempSelectedViewId;
      if (currentSelectedViewId === "list")
          tempSelectedViewId = "grid";
      else // currentSelectedViewId === "grid"
          tempSelectedViewId = "list";
      this.selectedView = tempSelectedViewId;
      this.selectedView = currentSelectedViewId;
  },

  _selectedDocumentChanged: function(to, from)
  {
      this._haveSelection = (this.selectedDocument !== null);
  },

  _onViewAsListButtonClicked: function(event)
  {
      this.selectedView = "list";
  },

  _onViewAsGridButtonClicked: function(event)
  {
      this.selectedView = "grid";
  },

  _onPreviewButtonClicked: function(event)
  {
      this.selectedView = "preview";
  },

  _onDownloadButtonClicked: function(event)
  {
      this.fire('download-documents-command', this.selectedDocument);
  },

  _onUploadButtonClicked: function(event)
  {
      this.fire('upload-documents-command');
  },

  _onDeleteButtonClicked: function(event)
  {
      var overrideWarning = event.metaKey;
      if (overrideWarning)
      {
          this.fire('delete-document-command', this.selectedDocument);
          return;
      }

      var prompt = "Are you sure you want to delete the selected document?";
      return this.$.confirmationDialog.confirm(prompt, "Delete Document")
          .then(function(choice)
          {
              if (choice === "cancel")
                  return;
              this.fire('delete-document-command', this.selectedDocument);
          }.bind(this))
  },

  _onShowDetailsButtonClicked: function(event)
  {
      this.fire('show-details-command');
  },

  _showButtonChanged: function()
  {
      this._showButtonBar = this._canShowButtonBar();
      this._respaceButtons();
  },

  _canShowButtonBar: function()
  {
      if (this.ftDocumentPanelShowHeading)
          return true;
      if (this._someViewButtonShown())
          return true;
      if (this._someUploadDownloadButtonShown())
          return true;
      if (this.ftDocumentPanelShowDeleteButton)
          return true;
      if (this.ftDocumentPanelShowDocumentCount)
          return true;
      return false;
  },

  _someViewButtonShown: function()
  {
      if (this.ftDocumentPanelShowGridButton)
          return true;
      if (this.ftDocumentPanelShowListButton)
          return true;
      if (this.ftDocumentPanelShowPreviewButton)
          return true;
      return false;
  },

  _someUploadDownloadButtonShown: function()
  {
      if (this.ftDocumentPanelShowUploadButton)
          return true;
      if (this.ftDocumentPanelShowDownloadButton)
          return true;
      return false;
  },

  _respaceButtons: function()
  {
      var groupSpacerWidth = 30;

      var headingSpacerWidth = 0;
      var viewButtonGroupSpacerWidth = 0;
      var uploadDownloadButtonGroupSpacerWidth = 0;

      if (this.ftDocumentPanelShowHeading)
          headingSpacerWidth = groupSpacerWidth;
      if (this._someViewButtonShown())
          viewButtonGroupSpacerWidth = groupSpacerWidth;
      if (this._someUploadDownloadButtonShown())
          uploadDownloadButtonGroupSpacerWidth = groupSpacerWidth;

      this._headingSpacerWidth = headingSpacerWidth;
      this._viewButtonGroupSpacerWidth = viewButtonGroupSpacerWidth;
      this._uploadDownloadButtonGroupSpacerWidth = uploadDownloadButtonGroupSpacerWidth;
  },

  _onSettingsPropertyChanged: function()
  {
      this._showButtonChanged();

      this.fire("settings-property-changed");
  }
});
