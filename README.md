<b>Project Description</b><br/>
	Haste is a simple ticketing system that would allow an organization to keep track of tasks and issues in the company. Users will be able to create, assign, track and take tasks.

<b>How to run this project</b><br/>
	1.	https://haste-backend.herokuapp.com/
	2.	All routes are listed here https://github.com/katetho/haste/blob/develop/src/server/routes/routes.ts
	3.	Create a user and log in
	4.	Front-End repo: https://github.com/katetho/haste_vue

<b>Current stage of development</b><br/>
	At the time of writing, this project has a database for storing tickets and users. A user can create a ticket and watch it dynamically appear with all the necessary information(title, description, deadline, etc).  All tickets appear on the home page(‘/’), ordered by date. This platform performs user authentication, so if you type in the homepage address, you will be redirected to ‘/users/signin’ if you’re not signed in, and the other way around for signed in users. For user registration I chose server-side field validation. Ticket creation fields are validated on the client side. For the most part, the UI was borrowed from a free bootstrap template and adjusted according to my needs. I’ve created some additional UI (e.g. ticket creation form), removed all of the utility scripts (dropdowns, tooltips, toggles, etc) and replaced them with my own. This website is in the active stage of development and I am currently working on many more features.

<b>Technology stack</b><br/>
	1.	Database: MySQL + Sequelize<br/>
	3.	Bundler, task runner: Webpack for modular code, gulp for compiling css and browserSync<br/>
	4.	Server-side: NodeJS with Express<br/>
	6.	Authentication: Sessions + cookies<br/>

<b>Reference Section</b><br/>
	Authentication:<br/>
https://www.npmjs.com/package/express-session <br/>
	Creating and manipulating schemas:<br/>
https://www.npmjs.com/package/mongoose<br/>
	Webpack:<br/>
https://sgom.es/posts/2018-01-18-multiple-routes-webpack/<br/>
https://webpack.js.org/<br/>
https://webpack.js.org/guides/production/<br/>
https://webpack.js.org/guides/code-splitting/<br/>
	Gulp:<br/>
https://coder-coder.com/gulp-tutorial-beginners/<br/>
	Github repos:<br/>
https://github.com/gothinkster/node-express-realworld-example-app<br/>
https://github.com/MatteoWebDeveloper/OOP-JS-with-webpack<br/>
https://github.com/baymyo/node-shopping-cart<br/>
https://github.com/mschwarzmueller/nodejs-shopping-cart-tutorial/blob/master/routes/index.js<br/>
	Handlebars:<br/>
https://handlebarsjs.com/guide/partials.html#basic-partials<br/>
https://handlebarsjs.com/guide/expressions.html#basic-usage<br/>
	SB Admin 2 (the UI)<br/>
https://startbootstrap.com/themes/sb-admin-2/<br/>
	General:<br/>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import<br/>
https://www.npmjs.com/package/bcrypt<br/>
