# pf-shop

pf-shop is an ecommerce website built with TypeScript, React, Redux, Redux Thunk, and Firestore. The project features include browsing and purchasing products, searching products by name, description, or tags, adding items to a cart and checkout, and authentication and authorization for users and admin.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Firebase Configuration](#firebase-configuration)
- [Contributing](#contributing)

## Installation

To install the project, follow these steps:

1. Clone the repository:

```
   git clone https://github.com/your-username/pf-shop.git
```

2. Install dependencies:

```
   cd pf-shop
   npm install
```

## Usage

To start the development server, run:

```
npm start
```

This will start the development server at http://localhost:3000.

To build the project for production, run:

```
npm run build
```

This will create a production build in the build directory.

## Firebase Configuration

To use Firebase authentication and authorization, you need to create a Firebase project and configure the credentials in the src/utils/firebase/firebase.utils.js file.

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).

2. In the Firebase console, go to Project settings > General and copy the Firebase SDK snippet > Config object.

3. Paste the config object in the src/utils/firebase/firebase.utils.js file:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

4. In the Firebase console, go to Authentication > Sign-in method and enable the Email/Password provider.

5. In the Firebase console, go to Firestore Database > Create database and choose Start in test mode.

6. In the Firebase console, go to Firestore Database > Rules and replace the default rules with the following:

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)
- [Firestore](https://firebase.google.com/docs/firestore)

## Contributions

While contributions are welcome, this is strictly a technology showcase for a developer portfolio.
