import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE } from '../constants';
import './main.css';

import imgSrc from '../static/media/dev_map.png';

import Rating from 'react-rating';

function getQueryString (name, specialty) {
  if (name) return `?name=${name.toLowerCase()}`;
  if (specialty) return `?specialty=${specialty.toLowerCase()}`;
  return '';
}

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
      specialty: '',
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
      searchResult: null,
      name: '',
      specialty: ''
    });
  }

  submitForm(e) {
    e.preventDefault();
    if (this.state.page === 'search') {
      const qs = getQueryString(this.state.name, this.state.specialty);

      axios.get(`${API_BASE}/dev${qs}`)
        .then(res => {
          const len = res.data.length;
          if (len === 0) { // 0 result
            return this.setState({
              notFound: true
            });
          } else if (len === 1) { // single result
            this.setState({
              searchResult: res.data,
              bubblePositionX: res.data[0].x,
              bubblePositionY: res.data[0].y
            });
          }else { // multiple results
            throw "Not Implemented";
          }

      });
    } else if (this.state.page === 'set') {
      axios.post(`${API_BASE}/dev`, {
        name: this.state.name,
        x: this.state.bubblePositionX,
        y: this.state.bubblePositionY,
        specialty: this.state.specialty.split(",").map(spe => spe.toLowerCase().trim())
      }).then(res => {
        console.log(res)
      });
    }

  }

  changeName(e) {
    this.setState({
      name: e.target.value,
      searchResult: null
    });
  }

  onClickRating(rate, e) {
    console.log(rate);
  }

  addSpecialty(e) {
    this.setState({
      specialty: e.target.value,
      searchResult: null
    });
  }

  renderForm() {
    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <div className="form-group">
          <label htmlFor="devname">Dev Name</label>
          <input type="text" className="form-control"
            value={this.state.name}
            onChange={this.changeName.bind(this)}
            onFocus={() => {this.state.page === 'search' && this.setState({ specialty: '' })}}
            placeholder="Name" name="devname"
          />
        </div>
        <div className="form-group">
          <label htmlFor="devspecialty">Specialty</label>
          <input type="text" className="form-control"
            value={this.state.specialty}
            onChange={this.addSpecialty.bind(this)}
            onFocus={() => {this.state.page === 'search' && this.setState({ name: '' })}}
            placeholder="Specialty"
          />
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>);
  }

  renderRating() {
    return (
      <Rating
        empty="fa fa-star-o fa-2x ratingStar"
        full="fa fa-star fa-2x ratingStar"
        fractions={2}
        onClick={this.onClickRating}
      />);
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
          <li role="presentation" onClick={this.changePage.bind(this, 'search')}
            className={this.state.page === 'search' && 'active'}
          ><a href="#">Find Dev</a></li>
          <li role="presentation" onClick={this.changePage.bind(this, 'set')}
            className={this.state.page === 'set' && 'active'}
          ><a href="#">Set my location</a></li>
        </ul>
        <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
          <div className="col-md-3">
            <div className="row">
              {this.renderForm()}
            </div>
            <div className="row">
              {this.renderRating()}
            </div>
          </div>
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
