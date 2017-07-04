import React, { Component } from 'react';
import axios from 'axios';
import { API_BASE } from '../constants';
import './main.css';
import Rating from 'react-rating';

class Speciality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillName: '',
      newSkillName: '',
      devname: '',
      notFound: false
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
    console.log(rate);
  }

  submitSearchSkill() {
  }

  submitAddNewSkill() {

  }

  render() {
    return (
      <div>
        <form>
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
        <form>
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
              onClick={this.changeRating}
            />
          </div>
          <button type="submit" className="btn btn-default">Add skill</button>
        </form>
      </div>
    );
  }
}

export default Speciality;