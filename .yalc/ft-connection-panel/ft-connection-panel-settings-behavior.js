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
 * `<ft-connection-panel-settings-behavior>`
 *
 * Mixin to get connection panel settings properties.
 *
 * @demo
 * @polymerBehavior FileThis.ConnectionPanelSettingsBehavior
 */
FileThis.ConnectionPanelSettingsBehavior = {

    observers:[
        '_onInternalSettingsChanged(ftConnectionPanelShowHeading, ftConnectionPanelHeading, ftConnectionPanelShowDeleteButton)',
    ],

    properties: {

        /** Show a heading string in the header. */
        ftConnectionPanelShowHeading:
        {
            type: Object,  // Can't use Boolean
            value: true,
            notify: true,
        },

        /** Heading to display when "ftConnectionPanelShowHeading" is true. */
        ftConnectionPanelHeading:
        {
            type: String,
            value: "Connections",
            notify: true,
        },

        /**
         * Show a button in the header that lets users delete the selected connection.
         *
         * Note that you can provide the strings "true" and "false" as attribute values.
         *
         * @type {boolean}
         */
        ftConnectionPanelShowDeleteButton:
        {
            type: Object,
            value: true,
            notify: true,
        },

    },

    attached: function()
    {
        this.async(function()
        {
            this._applySettingToProperty("ft-connection-panel-show-heading", "ftConnectionPanelShowHeading");
            this._applySettingToProperty("ft-connection-panel-heading", "ftConnectionPanelHeading");
            this._applySettingToProperty("ft-connection-panel-show-delete-button", "ftConnectionPanelShowDeleteButton");
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

        var theImport = indent + "<link rel=\"import\" href=\"https://connect.filethis.com/{{RELEASE_VERSION}}/ft-connection-panel/ft-connection-panel.html\">\n";

        return theImport;
    },

    generateSettingsElement: function(indent)
    {
        if (!this.hasSettings())
            return "";

        var settings = indent + "<ft-connection-panel-settings";

        // Keep alphabetized
        if (this.ftConnectionPanelHeading !== "Connections")
            settings += this._buildSettingAttribute("ft-connection-panel-heading", this.ftConnectionPanelHeading, indent);
        if (this.ftConnectionPanelShowDeleteButton !== true)
            settings += this._buildSettingAttribute("ft-connection-panel-show-delete-button", "false", indent);
        if (this.ftConnectionPanelShowHeading !== true)
            settings += this._buildSettingAttribute("ft-connection-panel-show-heading", "false", indent);

        settings += ">\n" + indent + "</ft-connection-panel-settings>\n";

        return settings;
    },

    // TODO: Factor out from here and copies in other classes
    _buildSettingAttribute: function(propertyName, propertyValue, indent)
    {
        return '\n' + indent + '    ' + propertyName + '="' + propertyValue + '"';
    },

    hasSettings: function()
    {
        if (this.ftConnectionPanelShowHeading !== true)
            return true;
        if (this.ftConnectionPanelHeading !== "Connections")
            return true;
        if (this.ftConnectionPanelShowDeleteButton !== true)
            return true;
        return false;
    },

    revertToDefaults: function()
    {
        this.ftConnectionPanelShowHeading = true;
        this.ftConnectionPanelHeading = "Connections";
        this.ftConnectionPanelShowDeleteButton = true;
    },
}
