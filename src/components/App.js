import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE } from '../constants';
import './main.css';

import imgSrc from '../static/media/dev_map.png';

function FindPosition(oElement)
{
  if(typeof( oElement.offsetParent ) !== "undefined")
  {
    for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
    {
      posX += oElement.offsetLeft;
      posY += oElement.offsetTop;
    }
      return [ posX, posY ];
    }
    else
    {
      return [ oElement.x, oElement.y ];
    }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 'search',
      searchResult: null,
      notFound: false,
      name: '',
      bubblePositionX: 0,
      bubblePositionY: 0
    };
  }

  handleClick(e) {

    if (this.state.page !== 'set') {
      return;
    }

    const myImg = e.target;

    var PosX = 0;
    var PosY = 0;
    var ImgPos;
    ImgPos = FindPosition(myImg);
    if (!e) var e = window.event;
    if (e.pageX || e.pageY)
    {
      PosX = e.pageX;
      PosY = e.pageY;
    }
    else if (e.clientX || e.clientY)
      {
        PosX = e.clientX + document.body.scrollLeft
          + document.documentElement.scrollLeft;
        PosY = e.clientY + document.body.scrollTop
          + document.documentElement.scrollTop;
      }
    PosX = PosX - ImgPos[0];
    PosY = PosY - ImgPos[1];
    this.setState({
      bubblePositionX: PosX - 25,
      bubblePositionY: PosY - 90
    });
  }

  changePage(newPage) {
    this.setState({
      page: newPage,
      searchResult: null
    });
  }

  submitForm(e) {
    e.preventDefault();
    if (this.state.page === 'search') {
      axios.get(`${API_BASE}/dev?name=${this.state.name}`)
        .then(res => {
          if (res.data.length < 1) {
            return this.setState({
              notFound: true
            });
          }
          this.setState({
            searchResult: res.data,
            bubblePositionX: res.data[0].x,
            bubblePositionY: res.data[0].y
          });
      });
    } else if (this.state.page === 'set') {
      axios.post(`${API_BASE}/dev`, { name: this.state.name, x: this.state.bubblePositionX, y: this.state.bubblePositionY })
        .then(res => {

      });
    }

  }

  changeName(e) {
    this.setState({
      name: e.target.value,
      searchResult: null
    });
  }

  renderForm() {
    return (
        <div className="col-md-3">
          <form onSubmit={this.submitForm.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Dev Name</label>
              <input type="text" className="form-control" onChange={this.changeName.bind(this)} placeholder="Name" />
            </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>);
  }

  renderBubble() {
    const x = this.state.bubblePositionX;
    const y = this.state.bubblePositionY;
    if (this.state.page === 'set' || this.state.searchResult !== null) {
      return (
      <div className="bubbleContainer" style={{ left: x, top: y }}>
        <div className="bubble">
          <div className="text-center" style={{marginTop:"10px", fontSize: "1.5em"}}>
            {this.state.searchResult ? `${this.state.searchResult[0].name} is here!` : null}
          </div>
        </div>
      </div>);
    }
    return null;
  }

  // <li role="presentation" onClick={this.changePage.bind(this, 'skills')}><a href="#">Search by skills</a></li>

  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          <li role="presentation" onClick={this.changePage.bind(this, 'search')} className="active"><a href="#">Find Dev</a></li>
          <li role="presentation" onClick={this.changePage.bind(this, 'set')}><a href="#">Set my location</a></li>
        </ul>
        <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
          {this.renderForm()}
          <div className="col-md-9 devMap">
            {this.renderBubble()}
            <img src={imgSrc} onClick={e => this.handleClick(e)} alt="map" />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
