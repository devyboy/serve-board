import React, { Component } from 'react';
import firebase from 'firebase';

class CreateMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: "",
            drink: ""
        }
    }

    updateInput = e => {
      this.setState({ [e.target.name]: e.target.value });
    }

    addUser = e => {
      e.preventDefault();
      const db = firebase.firestore();
      const userRef = db.collection("users").doc(this.props.userObject.uid);
      userRef.set({
        menu: firebase.firestore.FieldValue.arrayUnion({
          food: this.state.food,
          drink: this.state.drink
        })
      },
      {
        merge: true
      });

      this.setState({ food: "", drink: "" });
    }

    render() {
        return (
            <form onSubmit={this.addUser}>
              <input
                type="text"
                name="food"
                placeholder="food"
                onChange={this.updateInput}
                value={this.state.food}
              />
              <input
                type="text"
                name="drink"
                placeholder="drink"
                onChange={this.updateInput}
                value={this.state.drink}
              />
              <button type="submit">Submit</button>
            </form>
        );
    }
}

export default CreateMenu;