import React, { Component } from "react";
import firebase from 'firebase';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import SignIn from '../components/signin';
import '../css/App.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            recieved: false,
        };
    }
    
    componentDidUpdate() {
        if (!this.state.recieved) {
            firebase.firestore().collection('users').doc(this.props.userObject.uid).get()
            .then(doc => {
                if (doc.exists) {
                    this.setState({ data: doc.data(), recieved: true });
                }
            });
        }
    }


    render() {

        if (this.props.userObject === false || this.state.recieved === false) {
            return (
                <div>
                    <h1>ServeBoard</h1>
                    <ReactLoading type={"spin"} color={"black"} height={150} width={150} />
                </div>
            );
        }
        
        return(
            <div>
                <h1>ServeBoard</h1>
                {this.props.userObject
                    ? 
                    <div>
                        <div onClick={() => firebase.auth().signOut()}>Logout {this.props.userObject.displayName}</div>
                        <Link to="/new">
                            <div>
                                New
                            </div>
                        </Link>
                        {this.state.data.menu.map(menu => {
                            return(
                                <div>
                                    {menu.food}
                                </div>
                            );
                        })}
                    </div>
                    : 
                    <SignIn />
                }
            </div>
        );
    }
}

export default HomePage;