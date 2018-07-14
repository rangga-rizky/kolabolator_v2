import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import  {createProfile,getCurrentProfile}  from '../../actions/profileAction';
import isEmpty from '../../utils/is-empty'

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubUserName: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {},
      user:{},
      pending:false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubUserName: this.state.githubUserName,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData,this.props.history);

  }

  componentDidMount(){
      this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
        this.setState({errors:nextProps.errors});
    }
    
    this.setState({user:nextProps.auth.user});
    this.setState({pending:nextProps.profile.pending});
    if(!isEmpty((nextProps.profile.profile))){
        const profile = nextProps.profile.profile;
        const skillsCSV = profile.skills.join(',');
        profile.company = !isEmpty(profile.company) ? profile.company : "";
        profile.website = !isEmpty(profile.website) ? profile.website : "";
        profile.location = !isEmpty(profile.location) ? profile.location : "";
        profile.githubUserName = !isEmpty(profile.githubUserName) ? profile.githubUserName : "";
        profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
        profile.social = !isEmpty(profile.social) ? profile.social : {};
        profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : "";
        profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : "";
        profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : "";
        profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : "";
        profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : "";
        this.setState({
            handle: profile.handle ,
            company : profile.company,
            website : profile.website,
            location : profile.location,
            githubUserName : profile.githubUserName,
            bio : profile.bio,
            skills : skillsCSV,
            status : profile.status,
            linkedin : profile.linkedin,
            twitter : profile.twitter,
            youtube : profile.youtube,
            instagram : profile.instagram,
            facebook : profile.facebook,
        });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs,user } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Goverment staff', value: 'Goverment staff' },
      { label: 'Employee', value: 'Employee' },
      { label: 'Freelancer', value: 'Freelancer' },
      { label: 'Bussinessman', value: 'Bussinessman' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Profile</h1>
              <p className="lead text-center">
                Edit your profile
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Handle unik untuk profile url kamu"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Bantu mereka mengenali karir kamu sekarang"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Lokasi kamu berkarir sekarang"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Website yang kamu miliki"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Kota dan propinsi kamu berada (eg. Surabaya, Jawa Timur)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="pisahkan dengan koma (ex.
                    Komunikasi,manajemen,Web developer"
                />
                {user.userType === "Hacker" && (
                   <TextFieldGroup
                   placeholder="Github Username"
                   name="githubUserName"
                   value={this.state.githubUserName}
                   onChange={this.onChange}
                   error={errors.githubUserName}
                   info="jika kamu ingin menampilkan reposistory terbaru kamu"
                 />
                )}
               
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Ceritakan tentang kehidupanmu"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <button type="submit" className="btn btn-info btn-block mt-4" disabled={this.state.pending}  >
                     {!this.state.pending ? "submit" : "Loading"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(CreateProfile));
