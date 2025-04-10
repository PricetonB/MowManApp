# MowManApp
push notification app for lawn care companys that lets you add customers and appointments. 

when the appointment is marked as complete an email will be sent to customer letting them know. 

uses google oauth to login and mongoDB to handle data.  

You can view the site here http://www.mowmanapp.com/

WARNING: website example uses http and is not encrypted.  

HOW TO USE:
1. use git clone "https://github.com/PricetonB/MowManApp.git" to clone the code to your directory
2. create .env file with the following parameters

 GOOGLE_CLIENT_ID=""
 GOOGLE_CLIENT_SECRET=""
 can be obtained from google cloud console in "apis" under "credentials" after creating account and setting u keys

 
 SMTP_HOST="smtp.gmail.com"
 SMTP_PORT="587"
 these are default credentials for gmail

 SMTP_USER=""
 SMTP_PASS=""
 you need to create a gmail account for your app.
 Enable two factor authentication and create "App Password" in settings.
 user will be your app email address and pass will be your App Password (Gmail account password will not work)


 EXPRESS_SESSION_SECRET="random characters"
 EXPRESS_LISTENING_PORT=3000
 create a random string for express session secret and specify port you want to use

 MONGO_URL="mongodb+srv://username.randomletters"
 create a database on mongoDB Atlas website and get url for the database.
 You may also need to add your ip address to mongoDB Atlas whitelist.


3. in the "auth.js" file set the baseUrl if your not using local host:3000.

4. in the "public" directory set the baseUrl at the top of every .js file if your not using localhost:3000

5. type npm install in MowManApp directory. 

6. type npm start in the MowManApp directory.
