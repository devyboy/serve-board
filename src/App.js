import React, { Component } from "react";
import firebase from "firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewPage from './pages/NewPage';
import FourOhFour from "./pages/FourOhFour";
import './css/App.css';
import { yeet } from "./config.js";

// Firebase Credentials
var config = {
    apiKey: yeet.apiKey,
    authDomain: yeet.authDomain,
    databaseURL: yeet.databaseURL,
    projectId: yeet.projectId,
    storageBucket: yeet.storageBucket,
    messagingSenderId: yeet.messagingSenderId
  };

firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObject: false,
        };

        // When the user logs in, set userObject to them
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ userObject: user });

            firebase.firestore().collection('users').doc(user.uid).get()
            .then(doc => {
                if (doc.exists) {
                    this.setState({ data: doc.data() });
                }
            });
        });
    }

    render() {
        return(
            <Router>
                <Switch>
                        <Route exact path="/" render={(props) => <HomePage {...props} userObject={this.state.userObject} data={this.state.data} />} />
                        <Route path="/new" render={(props) => <NewPage {...props} userObject={this.state.userObject} />} />
                        <Route component={FourOhFour} />
                </Switch>
            </Router>
        );
    }
}

export default App;