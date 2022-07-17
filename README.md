React / Laravel Tasks Application
-------------------

In order to install Client
--------------------------------------
1. Be sure node.js is installed
2. Go to the frontend folder in console
3. Run "npm i" in command line
4. Run "npm start"
5. The app will be available on PORT: 3000

!!! NOTES !!!
--------------------------------------
All requests on client pointed to http://webbox.live domain
Change the base url by you needs in frontend/src/components/api/api.jsx file
 
In order to install Server
--------------------------------------
1. Be sure composer is installed
2. Go to the backend folder in console
3. Run "composer install" in command line
4. Check .env file if exist, if not, make a copy of .env_example with name .env, enter the right credentials for MySQL in MySQL section
5. Maybe you will be asked to generate application key(artisan)
6. Folder storage/logs in backend should be writable, give the rights permissions(linux / mac users)
7. Do migration(artisan) this will very helpful to fetch and add tasks


Apache
--------------------------------------
1.Configure you virtual host run content from backend/public folder, or put the content of backend folder to place you preffer.
