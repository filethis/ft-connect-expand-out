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
import './ft-connection-panel-settings-behavior.js';

import { IronMeta } from '@polymer/iron-meta/iron-meta.js';
import '@polymer/polymer/polymer-legacy.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

Polymer
({
    is: 'ft-connection-panel-settings',

    behaviors: [
        FileThis.ConnectionPanelSettingsBehavior,
    ],

    ready: function()
    {
        this._storeSettings();
    },

    _storeSettings: function()
    {
        new IronMeta({type: "setting", key: "ft-connection-panel-show-heading", value: this.ftConnectionPanelShowHeading});
        new IronMeta({type: "setting", key: "ft-connection-panel-heading", value: this.ftConnectionPanelHeading});
        new IronMeta({type: "setting", key: "ft-connection-panel-show-delete-button", value: this.ftConnectionPanelShowDeleteButton});
    },
});
