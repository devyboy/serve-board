// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { yeet } from "./config.js";


// Configure Firebase.
const config = {
    apiKey: yeet.apiKey,
    authDomain: yeet.authDomain,
    databaseURL: yeet.databaseURL,
    projectId: yeet.projectId,
    storageBucket: yeet.storageBucket,
    messagingSenderId: yeet.messagingSenderId
};

firebase.initializeApp(config);

// Configure FirebaseUI.
class SignInScreen extends React.Component {

    // The component's Local state.
    state = {
      isSignedIn: false // Local signed-in state.
    };
  
    // Configure FirebaseUI.
    uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
      }
    };
  
    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
          (user) => this.setState({isSignedIn: !!user})
      );
    }
    
    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
      this.unregisterAuthObserver();
    }
  
    render() {
      if (!this.state.isSignedIn) {
        return (
          <div>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
        );
      }
      return (
        <div>
          <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
          <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
        </div>
      );
    }
  }

export default SignInScreen;