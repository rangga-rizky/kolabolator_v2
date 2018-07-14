import React, { Component } from 'react'
import UserProjectList from './UserProjectList'
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import axios from 'axios';

class InvitePage extends Component {
  constructor(){
    super();
    this.state = {
        users:[],
        loading:true
    }
  }

  componentDidMount() {
    axios
    .get(`/api/projects/${this.props.match.params.id}/nonmembers`)
    .then(res =>{
            this.setState({loading:false,users:res.data})
        }
    )
    .catch(err => this.setState({loading:false}) );
  }

  render() {
    const project_id = this.props.match.params.id;
    let userContent;

    if (this.state.loading) {
        userContent = <Spinner />;
    } else {
        userContent =  <UserProjectList users={this.state.users} project_id={project_id}/>;
    }
    return (
    <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to={`/projects/${project_id}`} className="btn btn-light mb-3">
                <i className="fa fa-arrow-left"></i> Back To Project
            </Link>
            <p className="display-4">Undang kolabolator lain</p>
            {userContent }
          </div>
        </div>
      </div>
    )
  }
}

export default InvitePage;