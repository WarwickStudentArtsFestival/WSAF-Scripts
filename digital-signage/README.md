# SiteBuilder Digital Signage
In order to display website information on the [Digital Screens](https://warwick.ac.uk/services/engagementgroup/marketing/digitalengagement/screens/) across campus, we use a Warwick SiteBuilder page which is added to the ONELAN playlist.

Campus digital screens are on a VLAN which only has access to websites whitelisted by ITS. All assets and information must be served only from SiteBuilder and not from our own websites.

To get around this, we can use RSS feeds, which are fetched server-side, and then manipulate these using custom JavaScript. These RSS feeds contain JSON information about the event in each article body, which also contains base64-encoded images. This repository contains all scripts used for these screens so that they can be reused in the future.

## Screen Limitations
* RSS feed content is limited to 2MB, so we need to make sure that all images are resized to fit whtin this
* Digital signage resolution: 1437x808px
* Big screen resolution: 480x270px
* Oculus screen resolution: 3840x2160px (with 3 vertical bars where screens join)

## SiteBuilder Page Setup
1. Add an RSS Feed (Feeds -> RSS Feed) and enter the URL of the respective management page, setting it to show all items. This URL is likely one of the following:
   * https://wsaf-management-main.containers.uwcs.co.uk/ds/feed
   * https://management.wsaf.org.uk/ds/feed
2. In Customisation -> Edit Page Head, copy the HTML in general-head.html followed by [screen]-head.html.