 # jquery.smartPopup

 Behavior based newsletter popup library.

 This jQuery plugin allows for intelligent detection of user behavior before a popup is displayed. Plugin does not contain
 code to display a plugin, rather just the logic around displaying them.  Supports the ability to check number of page views and time on the site before displaying a popup, hence preventing the "newsletter popup on first page load" problem.

 Supports detection of utm_source in the url query string as to disable popups for newsletter recipients.

 Supports the ability to snooze notifications for a period of time, for example if a user closed a popup, but the developer would like that popup to reoccur in a week.

 ## Installation
 The plugin requires jQuery 1.8 or higher.

 Via [bower](https://github.com/vandevusse/jquery.smartPopup/blob/master/bower.json):
 ```bash
 bower install jquery.smartPopup
 ```
 ### _Settings_

 These are the supported settings. All are optional but one of pageViews or timeOnSite is recommended.
 Note that pageViews and timeOnSite is an "or" relationship, in that if both are defined once either condition is satisfied, the notification can be shown.

 * __pageViews__: The number of page views that should be seen before notification can be shown
 * __timeOnSite__: The time in seconds a user should be on the site before the notification is shown.
 * __utmSource__: Checks if a utm_source attribute is passed in the URL. Useful for blocking popups sourced from email notifications.
 * __snoozeWaitInDays__: If notification is snoozed (e.g. popup is closed for example), this is the amount of time until the notification can be shown again. By default, this is set to 7 days.

 ### _Methods__

 * __$.smartPopup('status')__: Check the status of a user, returns a useful string (for debugging usually).
 * __$.smartPopup('canShow')__: Returns a true or false whether a notification should be shown.
 * __$.smartPopup('snooze')__: Disable a notification for the number of days as defined by __snoozeWaitInDays__.
 * __$.smartPopup('register')__: Permanently disable a notification.

 ### Usage

 Example:

 For this site, we want to show a notification after 5 page views or 3 minutes on the site. Mailchimp newsletters for the site uses code 'purists' in the utm_source. If a popup is closed, we will wait one week to show it again.

 ```
 $.smartPopup({
  pageViews: '5',
  timeOnSite: '180',
  utmSource: 'purists',
  snoozeWaitInDays: 7
 });

 console.log($.smartPopup('status'));
 console.log($.smartPopup('canShow'));
 ```

 ### Downloading Manually

 If you want the latest stable version, get the latest release from the [releases page](https://github.com/vandevusse/jquery.smartPopup/releases).

 ## License

 MIT License

 Copyright (c) 2017 Ben van de vusse

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
