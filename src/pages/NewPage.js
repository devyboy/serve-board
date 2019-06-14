import React, { Component } from "react";
import firebase from 'firebase';
import ReactLoading from 'react-loading';
import { Redirect } from 'react-router-dom';
import '../css/App.css';

class HomePage extends Component {
    render() {
        console.log(this.props.userObject);
        if (this.props.userObject === false) {
            return (<ReactLoading type={"spin"} color={"black"} height={150} width={150} />);
        }
        if (this.props.userObject === null) {
            return(<Redirect to="/login" />);
        }
        return(
            <div>
                creating new menu now !!!
            </div>
        );
    }
}

export default HomePage;