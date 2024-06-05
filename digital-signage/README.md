# SiteBuilder Digital Signage
In order to display website information on the [Digital Screens](https://warwick.ac.uk/services/engagementgroup/marketing/digitalengagement/screens/) across campus, we use a Warwick SiteBuilder page which is added to the ONELAN playlist.

Campus digital screens are on a VLAN which only has access to websites whitelisted by ITS. All assets and information must be served only from SiteBuilder and not from our own websites.

To get around this, we can use RSS feeds, which are fetched server-side, and then manipulate these using custom JavaScript. These RSS feeds contain JSON information about the event in each article body, which also contains base64-encoded images. This repository contains all scripts used for these screens so that they can be reused in the future.

Note: all browsers running digital signage must be in the correct timezone (i.e. BST or Europe/London) otherwise times may show incorrectly.

## Screen Limitations
* RSS feed content is limited to 2MB, so we need to make sure that all images are resized to fit within this
* Digital signage resolution: 1437x808px
* Big screen resolution: 480x270px
* Oculus screen resolution: 3840x2160px (with 3 vertical bars where screens join)

## Behaviour
Upon fetching a URL with a category as the `category` URL parameter (e.g. `/feeds/wsaf/digital-signage?category=exhibition`):
1. If there are events starting in the next 3 hours, there is a 50% chance (Digital Signage)/30% chance (Big Screen) that these will be shown with a 'Starting Soon'. These will be shown sorted by start time, then randomly
2. If there are any upcoming events with that remaining category, they will be shown in a random order
3. Otherwise, if there are any remaining events, they will be shown in a random order
4. Otherwise, a 'Thanks for attending' image will be shown

Auto-advance & timings:
* For the Big Screen, the items shown will be shuffled every 15 seconds.
* For Digital Signage, the items shown will be shuffled every 30 seconds.
* Every 10 minutes, if the page is still active it will be refetched to fetch new data
* For both the Big Screen and Digital signage, if they are on a 'starting soon' mode and there are additional items then they will 'advance' every 8 seconds.

Oculus Signage
* This will always show all events, however passed events will be shown with transparency and a crossed out time.

## SiteBuilder Page Setup
Note that SiteBuilder is quite hard to use for this - you may need to inspect element etc. to select blocks/elements.

1. Add a block with a style of `screensize`
2. Add an image to the block with a class name of `wsaf-background` and with the corresponding background within the screen block
3. Add a block with a style of `wsaf-events` within the screen block
4. Add a block with a style of `wsaf-heading` within the screen block
5. Add an RSS Feed (Feeds -> RSS Feed) and enter the URL of the respective management page, setting it to show all items. This URL is likely one of the following:
   * https://wsaf-management-main.containers.uwcs.co.uk/ds/feed
   * https://management.wsaf.org.uk/ds/feed
6. In Customisation -> Edit Page Head, copy the HTML in general-head.html followed by [screen]-head.html.
7. Add a custom HTML block (Customisation -> Custom HTML) after the RSS feed with the following:
```html
Setup Script

<script>
   setup()
</script>
```