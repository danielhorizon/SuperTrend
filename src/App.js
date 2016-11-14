// YHack Project 
// imports 
// npm start 

import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

// make request variable using superagent 
var request = require('superagent');

// Initializing data 
class App extends Component {
  constructor() {
    super();
    this.changeName = this.changeName.bind(this);

    this.state = {
      data: {},
      age: 1,
    }
  }
// Fetch command 
// The URL of the API, no semicolon because it continues 
// Sort by popular, the source is the NYT, and the API Key (Ben's API Key)
// Set data to be the body of what you just fetched 
  componentDidMount() {
    const self = this;
    request.get("https://newsapi.org/v1/articles?source=the-new-york-times&apiKey=e83546681ea046dd91a71c99498569d3&sortBy=popular")
    .end(function(err, res){
      self.setState({
        data: res.body,
      })
    });
  }

  changeName() {
    this.setState({
      name: "bob",
    })
  }
// What renders on the page 
// html and appears on the page 
// Data and data map b/c render will happen before since asynchronous 
// Based on the order we received it, it'll bigger if index is lower 
// Id is for the CSS, that contains a break each time, and an anchor tag (link)
// Link is to obj.url (JSON, url and title are properties of the JSON data that we fetched) 
  render() {
    const data = this.state.data.articles;
    return (
      <div>
      <h1>Trending Now</h1>
        {
        data && data.map(function(obj, i) {
            const percentHeight = `${5*(data.length/((.4 * i)+1))}px`;
            const style = {
              fontSize: percentHeight,
            }
            return (
              <div id="box">
              <br/>
              <a href={obj.url} style={style}>{obj.title}</a>
              </div>
            );
          })
        }
      </div>
    );

    // return (
      // <div className="App">
        // <div className="App-header">
          // <img src={logo} className="App-logo" alt="logo" />
          // <h2>Welcome to React</h2>
        // </div>
        // <p className="App-intro">
          // To get started, edit <code>src/App.js</code> and save to reload.
        // </p>
      // </div>
    // );
  }
}

 export default App;
