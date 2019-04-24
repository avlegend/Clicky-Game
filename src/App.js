import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    currentScore: 0,
    highScore: 0,
    message: "",
    array: [],
    lastClickedId: null,
  };


  handleCardClick = id => {
    const { currentScore: oldScore, highScore: oldHighScore, lastClickedId, friends } = this.state;
    const newCurrentScore = oldScore + 1;
    const newHighScore = newCurrentScore > oldHighScore ? oldHighScore + 1 : oldHighScore;
    let newState = {};

    //logic for current score and high score
    if (!lastClickedId) {
      newState = {
        lastClickedId: id,
        currentScore: newCurrentScore,
        highScore: newHighScore,
      };
    }
    else {
      if (id === lastClickedId) {
        newState = {
          currentScore: 0,
          lastClickedId: null
        }
      }
      else {
        newState = {
          currentScore: newCurrentScore,
          highScore: newHighScore, 
          lastClickedId: id
        }
      }
    }



    const friendsCopy = [...friends];
    const shuffledFriends = this.shuffle(friendsCopy);
    newState = {
      ...newState,
      friends: shuffledFriends
    }

    this.setState(newState);
  }


  // We create the shuffle function to be called later
  shuffle = array => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


  // removeFriend = id => {
  //   // Filter this.state.friends for friends with an id not equal to the id being removed
  //   const friends = this.state.friends.filter(friend => friend.id !== id);
  //   // Set this.state.friends equal to the new friends array
  //   this.setState({ friends });
  // };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    console.log(this.state);
    return (
      <Wrapper>

        <Title>Friends List</Title>
        <p>Current Score: {this.state.currentScore}</p>
        <p>High Score: {this.state.highScore}</p>
        {this.state.friends.map(friend => (
          <FriendCard
            key={friend.id}
            handler={this.handleCardClick}
            {...friend}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
