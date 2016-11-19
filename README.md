# simple react bootstrap
Simple React-Redux bootstrap. I'll be adding Flow too when I find the time to do it.

# General
Well it's supposedly to be simple but it kinda isn't... Compared to the other bootstraps I made this one stands out to be one with the most boilerplate and moving parts. So sorry in advance!

It isn't ready yet, I've yet to make my own and proper validation which I've found to be too unintuitive with the Redux-form. But compared to Angular this is bootstrap is a lot more modular and should not get overly monotlithic when it grows.

NOTE: Don't mind about the error in console about react-router. Supposedly it will be fixed in the next-next major release 4.0 of react-router. :DD And fixing it now would be really a pain in the ass.

# How to install
1. Install Node.js and nvm if you don't have them by now. NOTE: Node.js versions >7 seem to cause problems for some reason. I recommend using some 6.x.x version e.g. 6.6.0. Basically it should work if you write ```curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash``` to your terminal. Then ```nvm install <node-version>``` and if you have already Node installed ```nvm use <node-version>```.
2. Clone this repository and go to the root and enter ```npm i``` or ```npm install```.
3. This app uses dotenv for storing environment variables, copy the ```.dev-env``` file in the root of this folder and name it to ```.env``` e.g. ```cp .dev-env .env```. If you want to use Travis or Heroku remember to add your variables to their config. Or for your own server create your own production ```.env```.
5. For better development experience it's recommended to use Postman for generating requests to your app. [Here's a link to Chrome plugin](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop). For making requests you should set your content-type to application/json and if you have authentication enabled remember to add X-Access-Token -header with valid token.
6. Now you're all set, enter ```npm start``` to run the development server.
7. Go to localhost:3333 to see the app running.

# Commands to remember
1. ```npm i <library> --S``` or ```npm i <library> --D``` (```-S``` equals ```--save``` and ```-D``` ```--save-dev```)
2. ```npm test```
3. ```npm run lint``` or ```npm run lint:fix```

# Structure
I've already described Redux somewhere sometime ago so I won't be writing it this time. Maybe some day when I'm very bored.
