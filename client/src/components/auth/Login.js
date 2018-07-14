import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loginUser } from '../../actions/authAction'
import TextFIeldGroup from '../common/TextFieldGroup' 

class Login extends Component {
  constructor(){
    super();
    this.state = {
      email : "",
      password : "",
      errors:{},
      pending:false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextprops){
    this.setState({pending:nextprops.auth.pending});
    if(nextprops.auth.isAuthenticated){
      nextprops.history.push('/dashboard');
    }

    if(nextprops.errors){
      this.setState({errors:nextprops.errors});
    }
  }

  onChange(e){
    this.setState({[e.target.name] : e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    const user = {
      password : this.state.password,
      email : this.state.email,
    }

    this.props.loginUser(user,this.props.history);
  }

  render() {
    const {errors} = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevKolabolator account</p>
              <form onSubmit={this.onSubmit}>
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

Login.prototypes = {
  loginUser: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth:state.auth,
  errors:state.errors
});

export default connect(mapStateToProps,{loginUser})(Login);

