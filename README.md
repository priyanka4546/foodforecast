# 🛒 FoodForecast
A React-based grocery management app that helps users plan and manage their grocery shopping efficiently.

---
## 🏷️Features

- Manage grocery lists with ease
- Integration with Firebase for backend services
- Environment variable support for API keys
- Push Notifications for low-stock and expiry alerts (using Expo Notifications + Firebase Cloud Messaging)
- Cross-platform support: Android and iOS
- User Authentication (Login / Signup) with Firebase Auth
  
 ---
 ## 🏷️Tech Stack

- **Frontend:** React Native, Expo
- **Backend:** Firebase Authentication, Firestore Database, Firebase Cloud Messaging
- **Tools:** VS Code, Expo CLI

---

## 🏷️Installation

### Prerequisites

- Node.js & npm
- Expo CLI (optional if using `npx`)
- VS Code or any code editor
- Expo Go app on your Android/iOS device for testing


1. Clone the repository:
   ```
   git clone  https://github.com/priyanka4546/foodforecast.git
   
   cd FoodForest 
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Install Expo CLI globally (optional):
   ```
   npm install -g expo-cli
   ```

---

## 🏷️Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password).
3. Create a **Firestore** database.
4. Get your Firebase config object from project settings.
5. Create a `firebase.js` file in the project root and paste your config:

import { initializeApp } from "firebase/app";

const firebaseConfig = {
apiKey: "YOUR_API_KEY",  
authDomain: "YOUR_AUTH_DOMAIN",   
projectId: "YOUR_PROJECT_ID",  
storageBucket: "YOUR_STORAGE_BUCKET",  
messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  
appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);

6. (Optional) Set up Firebase Cloud Messaging for notifications.

---

## 🏷️Running the App

Start the Expo development server:

```
npx expo start
```

- Scan the QR code using the Expo Go app on your phone.
- Alternatively, run on Android/iOS simulators.

---
## 🏷️Links
- [Expo](https://expo.dev/)
- [Firebase](https://firebase.google.com/)
- [React Native](https://reactnative.dev/)







