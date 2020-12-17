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
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { IronMeta } from '@polymer/iron-meta/iron-meta.js';

// Make sure the "FileThis" namespace exists
window.FileThis = window.FileThis || {};

/**
 * `<ft-document-panel-settings-behavior>`
 *
 * Mixin to get document panel settings properties.
 *
 * @demo
 * @polymerBehavior FileThis.DocumentPanelSettingsBehavior
 */
FileThis.DocumentPanelSettingsBehavior = {

    observers:[
        '_onInternalSettingsChanged(ftDocumentPanelShowHeading, ftDocumentPanelHeading, ftDocumentPanelShowGridButton, ftDocumentPanelShowListButton, ftDocumentPanelViewAsInitial, ftDocumentPanelShowPreviewButton, ftDocumentPanelShowUploadButton, ftDocumentPanelShowDownloadButton, ftDocumentPanelShowDeleteButton, ftDocumentPanelShowDocumentCount)',
    ],

    properties: {

        /**
         * Show a heading string.
         *
         * Note that you can provide the strings "true" and "false" as attribute values .
         *
         * @type {boolean}
         */
        ftDocumentPanelShowHeading:
        {
            type: Object,
            value: true,
            notify: true,

        },

        /** Heading to display when "ftDocumentPanelShowHeading" is true. */
        ftDocumentPanelHeading:
        {
            type: String,
            value: "Documents",
            notify: true,
        },

        /**
         * Show a button that lets users choose to view documents in a grid.
         *
         * Note that you can provide the strings "true" and "false" as attribute values .
         *
         * @type {boolean}
         */
        ftDocumentPanelShowGridButton:
        {
            type: Object,
            value: true,
            notify: true,
        },

        /**
         * Show a button that lets users choose to view documents in a list.
         *
         * Note that you can provide the strings "true" and "false" as attribute values .
         *
         * @type {boolean}
         */
        ftDocumentPanelShowListButton:
            {
                type: Object,
                value: true,
                notify: true,
            },

        /**
         * Initial view of documents. Either "grid" or "list".
         */
        ftDocumentPanelViewAsInitial:
            {
                type: String,
                value: "grid",
                notify: true,
                observer: "_onFtDocumentPanelViewAsInitialChanged",
            },

        /**
         * Show a button that lets users choose to preview the selected document.
         *
         * Note that you can provide the strings "true" and "false" as attribute values .
         *
         * @type {boolean}
         */
        ftDocumentPanelShowPreviewButton:
        {
            type: Object,
            value: false,
            notify: true,
        },

        /**
         * Show a button that lets users upload document files.
         *
         * Note that you can provide the strings "true" and "false" as attribute values .
         *
         * @type {boolean}
         */
        ftDocumentPanelShowUploadButton:
        {
            type: Object,
            value: false,
            notify: true,
        },

        /**
         * Show a button that lets users download file for the selected document.
         *
         * Note that you can provide the strings "true" and "false" as attribute values .
         *
         * @type {boolean}
         */
        ftDocumentPanelShowDownloadButton:
        {
            type: Object,
            value: false,
            notify: true,
        },

        /**
         * Show a button that lets users delete the selected document.
         *
         * Note that you can provide the strings "true" and "false" as attribute values .
         *
         * @type {boolean}
         */
        ftDocumentPanelShowDeleteButton:
        {
            type: Object,
            value: false,
            notify: true,
        },

        /**
         * Show count of documents.
         *
         * Note that you can provide the strings "true" and "false" as attribute values .
         *
         * @type {boolean}
         */
        ftDocumentPanelShowDocumentCount:
        {
            type: Object,
            value: true,
            notify: true,
        },

    },

    _onFtDocumentPanelViewAsInitialChanged: function(to, from)
    {
        this.fire("ft-document-panel-view-as-initial-changed-in-behavior");
    },

    attached: function()
    {
        this.async(function()
        {
            this._applySettingToProperty("ft-document-panel-show-heading", "ftDocumentPanelShowHeading");
            this._applySettingToProperty("ft-document-panel-heading", "ftDocumentPanelHeading");
            this._applySettingToProperty("ft-document-panel-show-grid-button", "ftDocumentPanelShowGridButton");
            this._applySettingToProperty("ft-document-panel-show-list-button", "ftDocumentPanelShowListButton");
            this._applySettingToProperty("ft-document-panel-view-as-initial", "ftDocumentPanelViewAsInitial");
            this._applySettingToProperty("ft-document-panel-show-preview-button", "ftDocumentPanelShowPreviewButton");
            this._applySettingToProperty("ft-document-panel-show-upload-button", "ftDocumentPanelShowUploadButton");
            this._applySettingToProperty("ft-document-panel-show-download-button", "ftDocumentPanelShowDownloadButton");
            this._applySettingToProperty("ft-document-panel-show-delete-button", "ftDocumentPanelShowDeleteButton");
            this._applySettingToProperty("ft-document-panel-show-document-count", "ftDocumentPanelShowDocumentCount");
        });
    },

    _applySettingToProperty: function(settingName, propertyName)
    {
        var meta = new IronMeta({type: "setting", key: settingName});
        var value = meta.value;
        if (value !== undefined)
            this.set(propertyName, value);
    },

    _onInternalSettingsChanged: function(to)
    {
        this.fire("internal-settings-changed");
    },

    generateSettingsImport: function(indent)
    {
        if (!this.hasSettings())
            return "";

        var theImport = indent + "<link rel=\"import\" href=\"https://connect.filethis.com/{{RELEASE_VERSION}}/ft-document-panel/ft-document-panel.html\">\n";

        return theImport;
    },

    generateSettingsElement: function(indent)
    {
        if (!this.hasSettings())
            return "";

        var settings = indent + "<ft-document-panel-settings";

        // Keep alphabetized
        if (this.ftDocumentPanelHeading !== "Documents")
            settings += this._buildSettingAttribute("ft-document-panel-heading", this.ftDocumentPanelHeading, indent);
        if (this.ftDocumentPanelShowDeleteButton !== false)
            settings += this._buildSettingAttribute("ft-document-panel-show-delete-button", "false", indent);
        if (this.ftDocumentPanelShowDocumentCount !== true)
            settings += this._buildSettingAttribute("ft-document-panel-show-document-count", "false", indent);
        if (this.ftDocumentPanelShowDownloadButton !== false)
            settings += this._buildSettingAttribute("ft-document-panel-show-download-button", "false", indent);
        if (this.ftDocumentPanelShowGridButton !== true)
            settings += this._buildSettingAttribute("ft-document-panel-show-grid-button", "false", indent);
        if (this.ftDocumentPanelShowHeading !== true)
            settings += this._buildSettingAttribute("ft-document-panel-show-heading", "false", indent);
        if (this.ftDocumentPanelShowListButton !== true)
            settings += this._buildSettingAttribute("ft-document-panel-show-list-button", "false", indent);
        if (this.ftDocumentPanelViewAsInitial !== "grid")
            settings += this._buildSettingAttribute("ft-document-panel-view-as-initial", "list", indent);
        if (this.ftDocumentPanelShowPreviewButton !== false)
            settings += this._buildSettingAttribute("ft-document-panel-show-preview-button", "false", indent);
        if (this.ftDocumentPanelShowUploadButton !== false)
            settings += this._buildSettingAttribute("ft-document-panel-show-upload-button", "false", indent);

        settings += ">\n" + indent + "</ft-document-panel-settings>\n";

        return settings;
    },

    // TODO: Factor out from here and copies in other classes
    _buildSettingAttribute: function(propertyName, propertyValue, indent)
    {
        return '\n' + indent + '    ' + propertyName + '="' + propertyValue + '"';
    },

    hasSettings: function()
    {
        if (this.ftDocumentPanelShowHeading !== true)
            return true;
        if (this.ftDocumentPanelHeading !== "Documents")
            return true;
        if (this.ftDocumentPanelShowGridButton !== true)
            return true;
        if (this.ftDocumentPanelShowListButton !== true)
            return true;
        if (this.ftDocumentPanelViewAsInitial !== "grid")
            return true;
        if (this.ftDocumentPanelShowPreviewButton !== false)
            return true;
        if (this.ftDocumentPanelShowUploadButton !== false)
            return true;
        if (this.ftDocumentPanelShowDownloadButton !== false)
            return true;
        if (this.ftDocumentPanelShowDeleteButton !== false)
            return true;
        if (this.ftDocumentPanelShowDocumentCount !== true)
            return true;
        return false;
    },

    revertToDefaults: function()
    {
        this.ftDocumentPanelShowHeading = true;
        this.ftDocumentPanelHeading = "Documents";
        this.ftDocumentPanelShowGridButton = true;
        this.ftDocumentPanelShowListButton = true;
        this.ftDocumentPanelViewAsInitial = "grid";
        this.ftDocumentPanelShowPreviewButton = false;
        this.ftDocumentPanelShowUploadButton = false;
        this.ftDocumentPanelShowDownloadButton = false;
        this.ftDocumentPanelShowDeleteButton = false;
        this.ftDocumentPanelShowDocumentCount = true;
    },

}
