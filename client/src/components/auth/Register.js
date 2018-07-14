import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {registerUser} from '../../actions/authAction'
import TextFIeldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import axios from 'axios'

class Register extends Component {
  
  constructor(){
    super();
    this.state = {
      name : "",
      email : "",
      userType: "",
      password : "",
      password2: "",
      options:[],
      errors:{},
      pending:false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
    axios.get(`/api/masters/user_types`)
      .then(res => {
        const opts = res.data.map(option => {
          return { label: option.name, value: option.name };
        });        
        this.setState({ options:opts,userType:opts[0].value});
      })
  }
  
  componentWillReceiveProps(nextprops){
    if(nextprops.auth.isAuthenticated){
      nextprops.history.push('/dashboard');
    }
    this.setState({pending:nextprops.auth.pending});
    if(nextprops.errors){
      this.setState({errors:nextprops.errors});
    }
  }

  onChange(e){
    this.setState({[e.target.name] : e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    const newUser = {
      name : this.state.name,
      password : this.state.password,
      email : this.state.email,
      userType : this.state.userType, 
      password2 : this.state.password2,
    }
    this.props.registerUser(newUser,this.props.history);
  }

  render() {
    const {errors,options} = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Kolabolator account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFIeldGroup
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  placeholder="Nama"
                  name="name"
                  error={errors.name}
                />                
                <TextFIeldGroup
                  type="text"
                  value={this.state.email}
                  onChange={this.onChange}
                  placeholder="Email Address"
                  name="email"
                  error={errors.email}
                />
                <TextFIeldGroup
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  placeholder="Password"
                  name="password"
                  error={errors.password}
                />     
                <TextFIeldGroup
                type="password"
                value={this.state.password2}
                onChange={this.onChange}
                placeholder="Confirm Password"
                name="password2"
                error={errors.password2}
              />  
              <SelectListGroup
                  placeholder="Tipe Kamu"
                  name="userType"
                  value={this.state.userType}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Apakah Kamu termakus Hipster,Hustler,Hacker ?"
                />   
                <button type="submit" className="btn btn-info btn-block mt-4" disabled={this.state.pending}  >
                     {!this.state.pending ? "submit" : "Loading"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.prototypes = {
  registerUser: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth:state.auth,
  errors:state.errors,
});

export default connect(mapStateToProps,{registerUser})(withRouter(Register));
