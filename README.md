[Demo](https://filethis.github.io/ft-connect-expand-out/components/ft-connect-expand-out/demo/)    [API](https://filethis.github.io/ft-connect-expand-out/components/ft-connect-expand-out/)    [Repo](https://github.com/filethis/ft-connect-expand-out)

### \<ft-connect-expand-out\>

An element that implements a FileThis user workflow as a set of panels that expand out to the right as things progress.

This is one of several variants of our FileThis Connect drop-in elements. This one expands to the right, when new UI elements are needed as the user traverses the workflow. Its use is appropriate when the hosting page can accomodate a significant increase in the horizontal space. If space on the page is more limited, or must be of fixed dimensions, another variant, like [ft-connect-tabbed](https://github.com/filethis/ft-connect-tabbed), or [ft-connect-wizard](https://github.com/filethis/ft-connect-wizard) would likely work better.

Initially, when a user account has no connections, this element will display a single panel of available websites. When the user selects one and enters their credentials, a connection is created and a second panel is created to the right of the first, displaying the new connection in a list. As the fetch operation proceeds for a connection and documents begin to be delivered, a third panel is created to the right of the second, displaying a list of document thumbnails.