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
      bubblePositionX: 0,
      bubblePositionY: 0
    };
  }

  handleClick(e) {

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
      bubblePositionX: PosX - 36,
      bubblePositionY: PosY + 14
    });
  }

  changePage(newPage) {
    this.setState({ page: newPage });
  }

  submitForm() {
    axios.get(`${API_BASE}/search`)
    .then(res => {
      this.setState({ searchResult: res.searchResult });
    })
  }

  renderForm() {
    if (this.state.page === 'search') {
      return (
        <div className="col-md-3">
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1">Dev Name</label>
              <input type="text" className="form-control" placeholder="Name" />
            </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>);
    }
    return null;
  }

  renderBubble() {
    const x = this.state.bubblePositionX;
    const y = this.state.bubblePositionY;
    if (this.state.bubblePositionX !== 0) {
      return (
      <div className="bubbleContainer" style={{ left: x, top: y }}>
        <div className="bubble"></div>
      </div>);
    }
    return null;
  }
  

  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          <li role="presentation" onClick={this.changePage.bind(this, 'search')} className="active"><a href="#">Find Dev</a></li>
          <li role="presentation" onClick={this.changePage.bind(this, 'skills')}><a href="#">Search by skills</a></li>
          <li role="presentation"><a href="#">Set my position</a></li>
        </ul>
        <div className="row">
          {this.renderForm()}
          <div className="col-md-9 devMap">
            {this.renderBubble()}
            <img src={imgSrc} onClick={e => this.handleClick(e)} alt="test" />
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
