## Calendar App - Next.js

This is a calendar app made with React, NextJs, FullCalendar, Material UI, Redux toolkit, Formik, and other libraries. It is a simple, elegant calendar app that allows you to add events to a calendar and view them. It also allows you to edit and delete events. It also allows you to view events for a specific date range. It also allows you to drag and drop events and resize events. It also has a month, week, and day view.

## Features

The features of this app are:

- The calendar has a month, week, and day view
  \*\* To view the month, week, and day view, click on the month, week, and day buttons on the top right corner of the calendar. and on a mobile device, or a smaller screen the view is automatically set to the day view.

- Add events to a calendar
  \*\* To add an event, click on the day you want to add an event to and fill out the form

- Edit events
  \*\* To edit an event, click on the event and click on the confirm button on the dialog box. and it will edit the event.

- Delete events
  \*\* To delete an event, click on the event and click on the delete button on the dialog box, which is on the bottom left corner. and it will delete the event.

- View events
  \*\* To view events, click on the day you want to view events for, and the dialog box will pop up and click on Events button, and it will take you to the events page for a specific date range.

- View events for a specific date range
  \*\* To view events for a specific date ranges, click on the day you want to view events for, and the dialog box will pop up and click on Events button, and it will take you to the events page for a specific date range.

- Drag and drop events
  \*\* To drag and drop events, click on the event and drag it to the day you want to move it to, and it will move the event to that day.

- Resize events
  \*\* To resize events, click on the event and drag the bottom right corner of the event to the day you want to resize it to, and it will resize the event to that day.

## Technologies Used

- React
- Next.js
- Material UI
- FullCalendar
- Redux toolkit with RTK Query
- Formik & Yup
- React Icons
- Date-fns

## Models

The models for this app are:

The events model is associated with the users model. The events model has a userId that is associated with the users model. The users model has an id that is associated with the events model.

- Events
  ** id
  ** title
  ** description
  ** start
  ** end
  ** allDay
  \*\* userId

- Users
  ** id
  ** name
  ** email
  ** password

## Images

![Calendar App](./calender-app.png)

![Calendar App](./calendar-app-modal.png)

## How to use

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`
4. Go to `http://localhost:3000`
5. Enjoy!
