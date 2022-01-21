# Movies-Subscriptions-React-Project
This is a Movies Subscriptions react project.

This is my final project in my Full-Stack course. 
In this project i used all the tools i learned in the course
including react.js, node.js, mongoDB, axios, react-redux, hooks, react-router-dom and more.

The project is divided to two parts:
The client side where there is all the react components and functions,
And the back-end where there are two servers runing using node.js and mongoose.

instructions:
First open the CinemaWS and SubscriptionsWS folders, install: axios, cors, mongoose, express and jsonFile.
Run in both web services the server.js file in node.js.
Now to the client side copy all the folders in react src folder.
Then you will need to install: axios, react-redux, redux and react-router-dom.
Call the placeholder component from the app.js file.
The final step before you can run it, it to change some data in the index.js file so it will work with react-router-dom and redux.
Just copy this:

import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux';
import reducer from './Components/reducer';
import { Provider } from 'react-redux';

const appStore = createStore(reducer)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={appStore}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

Now you can run npm start.

