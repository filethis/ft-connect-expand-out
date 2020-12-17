/*
Copyright 2017 FileThis, Inc.

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
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import './ft-document-panel-settings-behavior.js';

import { IronMeta } from '@polymer/iron-meta/iron-meta.js';
import '@polymer/polymer/polymer-legacy.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer
({
    is: 'ft-document-panel-settings',

    behaviors: [
        FileThis.DocumentPanelSettingsBehavior,
    ],

    ready: function()
    {
        this._storeSettings();
    },

    _storeSettings: function()
    {
        new IronMeta({type: "setting", key: "ft-document-panel-show-heading", value: this.ftDocumentPanelShowHeading});
        new IronMeta({type: "setting", key: "ft-document-panel-heading", value: this.ftDocumentPanelHeading});
        new IronMeta({type: "setting", key: "ft-document-panel-show-grid-button", value: this.ftDocumentPanelShowGridButton});
        new IronMeta({type: "setting", key: "ft-document-panel-show-list-button", value: this.ftDocumentPanelShowListButton});
        new IronMeta({type: "setting", key: "ft-document-panel-view-as-initial", value: this.ftDocumentPanelViewAsInitial});
        new IronMeta({type: "setting", key: "ft-document-panel-show-preview-button", value: this.ftDocumentPanelShowPreviewButton});
        new IronMeta({type: "setting", key: "ft-document-panel-show-upload-button", value: this.ftDocumentPanelShowUploadButton});
        new IronMeta({type: "setting", key: "ft-document-panel-show-download-button", value: this.ftDocumentPanelShowDownloadButton});
        new IronMeta({type: "setting", key: "ft-document-panel-show-delete-button", value: this.ftDocumentPanelShowDeleteButton});
        new IronMeta({type: "setting", key: "ft-document-panel-show-document-count", value: this.ftDocumentPanelShowDocumentCount});
    },

});
