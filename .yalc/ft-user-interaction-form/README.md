[Demo](https://filethis.github.io/ft-user-interaction-form/components/ft-user-interaction-form/demo/)    [API](https://filethis.github.io/ft-user-interaction-form/components/ft-user-interaction-form/)    [Repo](https://github.com/filethis/ft-user-interaction-form)

### \<ft-user-interaction-form\>

This element renders FileThis user interaction requests as a GUI dialog. 

Given the user interaction request as JSON, this element will dynamically render the dialog widgets it contains. These may include a dialog title, static text items, radiobuttons, text entry fields, and links.

When the user fills in, or make selections in the dialog widgets and then clicks a commit button, the element will populate a response property with the JSON represention of the data. This response data can be returned to a FileThis server.

User interaction request schemas up to version 2.0.0 are supported.

The element can be composed into other elements. See the user interaction [demo application](https://filethis.github.io/ft-user-interactions-demo), for an example of this.