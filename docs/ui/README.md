# Notification component data expectations

## The notification component expects a data object comprised of the following:

      {
        id:  'a unique identification for each notificaiton',
        title: 'this title appears at the top of the notification',
        icon: 'displays an icon on the left side; available choices are: alert, chevron, close, danger, info, weather-snow, weather-sun',
        description: 'the notification description',
        callToActionUrl: 'a destination url for the call-to-action label below',
        callToActionLabel: 'a call to action that appears at the bottom of the notificaiton',
        dismissible: 'boolean that determines whether or not a notification can be dismissed',
        color: 'allows an alternate base color for the notification',
        notificationStyle: 'the style of the notification; available choices are: banner, in-line',
        importance: determines 'the color scheme of the notification; available choices are: emergency, alert, info'
      }

## Example

      {
        id: '907307e4-36ef-8640-74ff-c67e324201e7',
        title: 'All schools closed due to inclement weather',
        icon: 'weather-snow',
        description: 'Due to deteriorating weather conditions, all schools will be closed today.',
        callToActionUrl: 'https://www.yoururl.org',
        callToActionLabel: "Learn more",
        dismissible: true,
        color: '',
        notificationStyle: 'banner',
        importance: 'alert',
      },

## Notification styles

* Banner - notification content is placed inside a large container, normally placed at the top of the page
* Inline - notification content is placed in a container that is inline with other page content
* Floating - notifiation content is placed in floating containers above page content

## Notification importance

* Emergency - red; banner background will be solid red background with white text, in-line will have a white background with a red icon
* Alert - yellow; banner background will be solid yellow background with dark text, in-line will have a white background with a yellow icon
* Info - blue/green; banner background will be solid blue/green background with white text, in-line will have a white background with a blue/green icon
