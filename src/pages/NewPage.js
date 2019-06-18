import React, { Component } from "react";
import ReactLoading from 'react-loading';
import { Redirect } from 'react-router-dom';
import CreateMenu from '../components/createMenu';
import '../css/App.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        if (this.props.userObject === false) {
            return (<ReactLoading type={"spin"} color={"black"} height={150} width={150} />);
        }
        if (this.props.userObject === null) {
            return(<Redirect to="/login" />);
        }
        return(
            <div>
                <CreateMenu userObject={this.props.userObject}/>
            </div>
        );
    }
}

export default HomePage;