import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

var pages = {
  start: {
    text: "Welcome, traveler! How would you like to get to your destination?",
    leftLabel: "Train",
    rightLabel: "Ship",
    leftPage: "onthetrain",
    rightPage: "ontheship"
  },
  onthetrain: {
    text:
      "Welcome aboard the choo-choo train! Please make your way to your seat. What's the number?",
    leftLabel: "12E",
    leftPage: "on12e"
  },
  on12e: {
    text:
      "You take your seat and look out the window, you hear a grumble coming from your stomach. Buy a snack or check your bag for snacks? ",
    leftLabel: "Buy",
    rightLabel: "Check",
    leftPage: "choosebuy",
    rightPage: "choosecheck"
  },
  choosebuy: {
    text:
      "You wait for the conductor to pass by with a cart full of candy bars and chips, which do you choose? ",
    leftLabel: "Candy",
    rightLabel: "Chips",
    leftPage: "choosecandy",
    rightPage: "choosechips"
  },
  choosechips: {
    text:
      "You buy a small bag of Lays chips and bite into a chip. Then you start to scarf if down because of how hungry you are. Once you finish, you take a deep breath and take a nap until your arrival.",
    leftLabel: "Go Back",
    rightLabel: "Game Over",
    leftPage: "choosebuy",
    rightPage: "end"
  },
  choosecandy: {
    text:
      "You buy a Snickers bar only to forget you are severely allergic to nuts. You get an allergic reaction and die.",
    leftLabel: "Go Back",
    rightLabel: "Game Over",
    leftPage: "choosebuy",
    rightPage: "end"
  },
  choosecheck: {
    text: "You look in your bag and there was no snack. You starve to death",
    leftLabel: "go back",
    rightLabel: "game over",
    leftPage: "on12e",
    rightPage: "end"
  },

  ontheship: {
    text:
      "Welcome aboard the errnk-errnk ship! Please make your way to your room. What's the number?",
    leftLabel: "123",
    leftPage: "in123"
  },
  in123: {
    text:
      "You're in your room now. But you hear a rattle coming from you bathroom. Check it out?",
    leftLabel: "Yes",
    rightLabel: "No",
    leftPage: "chooseyes",
    rightPage: "chooseno"
  },
  chooseno: {
    text:
      "You just go down to the lobby and ask for a new room. You never knew what the rattling noise was and never bothered to care.",
    leftLabel: "Go Back",
    rightLabel: "The End",
    leftPage: "in123",
    rightPage: "end"
  },
  chooseyes: {
    text: "You slowly walk towards the bathroom...",
    leftLabel: "Flee",
    rightLabel: "Keep Going",
    leftPage: "end",
    rightPage: "choosegoing"
  },
  choosegoing: {
    text:
      "The rattling noise stops as you approach the bathroom closer. You find the nearest hard object you can find to protect yourself. You inch closer to the bathroom door and take a quick peek.",
    leftLabel: "Flee",
    rightLabel: "Continue",
    leftPage: "end",
    rightPage: "choosecontinue"
  },
  choosecontinue: {
    text:
      "You slowly open the bathroom door while holding up your hard object. You decide to lunge out into the bathroom...",
    leftLabel: "Flee",
    rightLabel: "Continue!!",
    leftPage: "end",
    rightPage: "choosecontinue2"
  },
  choosecontinue2: {
    text: "It was just the blinds hitting against an open winddow.",
    leftLabel: "The end",
    leftPage: "end"
  },

  end: {
    text: "Bye bye! Come again",
    leftLabel: "Start Over?",
    leftPage: "start",
    type: "image",
      data: {
        src:"https://pbs.twimg.com/media/DaA7tyQUMAAXyi0.jpg:large",
      }
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "start"
    };
  }

  goToPage(pageName) {
    this.setState({
      page: pageName
    });
  }
  

  render() {
    var pageData = pages[this.state.page];

    return (
      <div className="App">
        <p>{pageData.text}</p>
        <button onClick={() => this.goToPage(pageData.leftPage)}>
          {pageData.leftLabel}
        </button>
        <button onClick={() => this.goToPage(pageData.rightPage)}>
          {pageData.rightLabel}
        </button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
