# Currency convert mobile application
This is a simple mobile application which when instructed to convert a currency from one to another will return the converted amount.

![alt text](./src/AppDemo.gif)

## How does it work?
* This app is built using React-Native for frontend and Python Flask for backend.
* It also uses Hasura data api for inserting or fetching data from DB and Hasura Auth API for user authentication.
* The user has to initially signup using his/her username, e-mail ID and password and login using the same.
* Once the user logs in, a chat screen opens where the user can make queries such as 'convert 1 rupee to dollar' or 'convert   3 dollars to rupee' etc.
* These queries are sent to the bot which replies with the converted amount.
* The currency conversion bot is implemented using DialogFlow(api.ai).
* Once the user has finished with all the queries, he/she has to logout.

## Prerequisites
* Ensure that you have Node installed on your computer, do this by running `node-v` in the terminal. If you do not have Node installed you can get it from https://nodejs.org

## How to use the app ?

### Expo version
* `git clone https://github.com/prmehta24/CConvert.git`
* `cd CConvert/ReactNativeApp`
* `npm install`
* `npm install native-base --save`
* `npm install react-native-gifted-chat --save`
* install 'expo' app on your android device. You can download it from the Google Play Store.
* `npm start`
  
  It takes sometime to load the packages. At the end, a QR code appears in your terminal. Scan it using 'expo' app.

The app opens!!

Alternative way :
* Install expo XDE. Refer https://docs.expo.io/versions/latest/introduction/installation.html for installation.
* Open expo XDE
* Click on `Open existing project` and select `Curency_convert`
* Once the project loads, click on Share.
* Scan the QR code using the Expo app from your phone (Install from Playstore)
The app opens!!

### Using apk
* Download apk from here : https://drive.google.com/open?id=17gzJINbdhoeFzcYsq8QqBy6T3ObQWxvQ
* Install in your phone and run it.

### Expo live demo
To view the demo of the app on Expo:
* Scan the following QR code
<Image source="https://github.com/prmehta24/CConvert/blob/master/ReactNativeApp/src/qr.png" height=150 width=150 /> OR
* Open the following URL in your expo app: `exp://gm-s9a.prajna12.reactnativeapp.exp.direct:80`

  
