import React, { Component } from "react";
import firebase from 'firebase';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import SignIn from '../components/signin';
import '../css/App.css';

class HomePage extends Component {
    render() {
        console.log(this.props.userObject);
        if (this.props.userObject === false) {
            return (<ReactLoading type={"spin"} color={"black"} height={150} width={150} />);
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
                    </div>
                    : 
                    <SignIn />
                }
            </div>
        );
    }
}

export default HomePage;