import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addDiscussion } from '../../actions/projectAction';

class DiscussionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {},
      pending:false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({pending:newProps.project.pending});
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newDiscussion = {
      text: this.state.text,
      project:this.props.project_id
    };

    this.props.addDiscussion(newDiscussion);
    this.setState({ text: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Buat Diskusi..</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a discussion"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark" disabled={this.state.pending}  >
                    <i className="fa fa-pen-square"></i> {' '}
                    {!this.state.pending ? "submit" : "Loading"}
                </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

DiscussionForm.propTypes = {
  addDiscussion: PropTypes.func.isRequired,
  project_id: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  project: state.project,
  errors: state.errors
});

export default connect(mapStateToProps, { addDiscussion })(DiscussionForm);
