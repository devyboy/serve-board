import React, { Component } from "react";
import firebase from 'firebase';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
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
                    <Link to="/login">
                        <div className="button">
                            Login
                        </div>
                    </Link>
                }
            </div>
        );
    }
}

export default HomePage;