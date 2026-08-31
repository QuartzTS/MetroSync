# About
This project is a very simple backend for real-time metro information system, built with Node.js, Express.js, Socket.IO and MongoDB.
# How to install this
First, you need to install the necessary tools:
- Git (to clone this repository)
	- Github Desktop (or any other git GUI app as an alternative to CLI)
- Visual Studio Code (or any other IDE that supports Javascript)
- Node.js (the runtime for the server)
- MongoDB (the database system)
	- MongoDB Compass (optional for viewing documents in a nice GUI)
- Postman (essential for testing HTTP methods)

Then you need to write this in the terminal to clone this repository:
```
git clone https://github.com/QuartzTS/MetroSync
```
Then navigate to the folder and write:
```
npm install
```
# How to run this
This is hopefully as easy as running `npm run start` in the terminal (Or `npm run dev`). The next thing you can do is:
- Run Postman with URL `localhost:"port number, this should appear in the terminal"` and test the routes and HTTP methods
- Check MongoDB Compass for changes in the database (or MongoDB shell if you have it and are able to use it)
- Run `npm test` to test some stuff using Jest
- Run `npm run plant-seed` to seed the station records (unless they already exist)
- Additionally, you can also test the whole thing in a browser
# Available endpoints
- `/api/v1` - Displays a useless greeting message
- `/health` - indicates that the server is healthy and running properly
- `/api/v1/auth` - manages authentication and authorization
- `/api/v1/stations` - manages stations
- `/api/v1/stations/:id/announcements` - manages announcements in a station
# Feedback
If something is wrong, then please make an issue in the Issues tab.
