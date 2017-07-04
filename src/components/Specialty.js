import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE } from '../constants';
import './main.css';
import Rating from 'react-rating';

import { getQueryString } from '../utils';

class Speciality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillName: 'c#',
      rating: 0,
      newSkillName: '',
      devname: '',
      notFound: false,
      searchResult: [] //[{name: 'zac', specialty: [{ name: 'c#', rating: 2}] }]
    }
  }

  changeSkillName(e) {
    this.setState({
      skillName: e.target.value,
      notFound: false
    })
  }

  changeDevName(e) {
    this.setState({
      devName: e.target.value,
      notFound: false
    })
  }

  changeNewSkillName(e) {
    this.setState({
      newSkillName: e.target.value
    });
  }

  changeRating(rate, e) {
    this.setState({
      rating: rate
    });
  }

  submitSearchSkill(e) {
    e.preventDefault();
    axios.get(`${API_BASE}/dev?specialty=${this.state.skillName}`)
      .then(res => {
        this.setState({ searchResult: res })
      });
  }

  submitAddNewSkill(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="col-md-3" style={{ marginTop: 20 }}>
          <form onSubmit={this.submitSearchSkill.bind(this)}>
            <div className="form-group">
              <label htmlFor="skillName">Search by Skill Name</label>
              <input type="text" className="form-control"
                value={this.state.skillName}
                onChange={this.changeSkillName.bind(this)}
                placeholder="Skill Name" name="skillName"
              />
              {this.state.notFound && <div>Not found</div>}
            </div>
            <button type="submit" className="btn btn-default">Search skill</button>
          </form>
          <form onSubmit={this.submitAddNewSkill.bind(this)}>
            <h3>Add your new skill</h3>
            <div className="form-group">
              <label htmlFor="devName">Your Name</label>
              <input type="text" className="form-control"
                value={this.state.name}
                onChange={this.changeDevName.bind(this)}
                placeholder="Name" name="devname"
              />
              {this.state.notFound && <div>Not found</div>}
            </div>
            <div className="form-group">
              <label htmlFor="devName">Your Skill Name</label>
              <input type="text" className="form-control"
                value={this.state.newSkillName}
                onChange={this.changeNewSkillName.bind(this)}
                placeholder="Skill Name" name="newSkillName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <Rating
                empty="fa fa-star-o fa-2x ratingStar"
                full="fa fa-star fa-2x ratingStar"
                fractions={2}
                onClick={this.changeRating.bind(this)}
                initialRate={this.state.rating}
              />
              <span>   {this.state.rating}</span>
            </div>
            <button type="submit" className="btn btn-default">Add skill</button>
          </form>
        </div>
        <div className="col-md-5">
          <h3>Search result: {this.state.skillName}</h3>
          {this.state.searchResult.map(x =>
            <div style={{ marginTop: 20 }}>
              <span>name: {x.name}</span>
              <div>rating:
                <Rating
                  empty="fa fa-star-o fa-2x ratingStar"
                  full="fa fa-star fa-2x ratingStar"
                  fractions={2}
                  readonly
                  initialRate={x.specialty.find(s => s.name === this.state.skillName).rating}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Speciality;