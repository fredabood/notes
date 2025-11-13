---
title: Calendar Management
---

# Automating my Calendar Management

## The Stoplight System

I manage my calendar using a stop light system to color code events. This is useful for maintaining a visually organized calendar where my obligations are easily distinguishable by color.​​​​​​​​​​​​​​​​

My system distinguishes between 4 categories of events

**Red**

- Those you must or plan to attend
- Defined by a “Yes” response AND not matching my defined skip criteria

**Yellow**

- Those you try to attend if possible
- Defined by a “Maybe” response AND not matching the skip criteria

**Green**

- Those you can safely skip
- These events must match the skip criteria

**Grey**

- Non-meeting events like focus time and out of office
- Focus Time, Out of Office, or events starting with “do not book”

## Automated Event Color Coding

I wrote the below to automatically set event colors in my Google Calendar for the next 6 months according to this system.

To leverage this script

1. Put the name of your calendar in line 30
2. Populate the filter arrays in lines 23-26

If these arrays are all left empty, then events with a RSVP marked “yes” will be colored red and events with a “maybe” will be yellow.

There are separate arrays for different types of title matching.

    - Exact title matches (`skipEvents`). This is an array of full event names.
    - Title starts with certain text (`skipStartsWith`). This is an array of event name prefixes.
    - Title contains certain text (`skipContains`). The strings in this array can be anywhere in the event title. It’s also case insensititive. I use this to find office hours and all hands.

Paste the code in AppScript and schedule it to run periodically.

```javascript
// https://developers.google.com/apps-script/reference/calendar/calendar-app
function ColorEvents() {

  var today = new Date();
  var nextSixMonths = new Date();
  nextSixMonths.setDate(nextSixMonths.getDate() + 180);
  Logger.log(today + " " + nextSixMonths);

  // https://developers.google.com/apps-script/reference/calendar/event-color

  var emptyStatus = CalendarApp.GuestStatus.INVITED

  var yesStatus = CalendarApp.GuestStatus.YES
  var yesColor = CalendarApp.EventColor.RED

  var maybeStatus = CalendarApp.GuestStatus.MAYBE
  var maybeColor = CalendarApp.EventColor.YELLOW

  var dnbColor = CalendarApp.EventColor.GRAY
  var dnbStatus = ["FOCUS_TIME", "OUT_OF_OFFICE"];

  var skipColor = CalendarApp.EventColor.GREEN
  var skipEvents = [];
  var skipContains = [];
  var skipStartsWith = [];
  var override = []

  // https://developers.google.com/apps-script/reference/calendar/calendar-app#getAllOwnedCalendars()
  // https://developers.google.com/apps-script/reference/calendar/calendar-app#getcalendarsbynamename
  var myCalendar = ''

  var calendars = CalendarApp.getCalendarsByName(myCalendar);
  var calendar = calendars[0]
  var events = calendar.getEvents(today, nextSixMonths);
  Logger.log("found " + events.length + " events and "+ calendars.length + " calendars.");

  for (var j=0; j<events.length; j++) {
    var e = events[j];
    var title = e.getTitle();
    var myStatus = e.getMyStatus()

    // DNB
    if (
      title.toLowerCase().includes("do not book") ||
      dnbStatus.includes(String(e.getEventType()))
    ) {
      e.setColor(dnbColor);
      continue;
    }

    // RSVP Yes > Red
    if (yesStatus == myStatus) {
      e.setColor(yesColor);
    }
    // RSVP Maybe > Yellow
    if (maybeStatus == myStatus) {
      e.setColor(maybeColor);
    }

    // don't pass the override events into the skip sequence
    if (override.includes(title)) {
      continue;
    }

    // Skip discrete events
    if (
      skipEvents.includes(title)
    ) {
      e.setColor(skipColor);
      continue;
    }
    // Skip events starting with ...
    if (
      skipStartsWith.some(skip => title.startsWith(skip))
    ) {
      e.setColor(skipColor);
      continue;
    }
    // Skip events containing "office hours" or "all hands"
    if (
      skipContains.some(skip => title.toLowerCase().includes(skip))
    ) {
      e.setColor(skipColor);
      continue;
    }
  }
}
```