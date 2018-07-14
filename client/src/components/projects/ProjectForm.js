import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { addProject } from '../../actions/projectAction';
import axios from 'axios';

import './Dropbox.css';

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      title: '',
      type:'',
      image: '',
      attachment:'',
      pending:false,
      options:[],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(`/api/masters/project_types`)
    .then(res => {
      const opts = res.data.map(option => {
        return { label: option, value: option };
      });
      this.setState({ options:opts,type:opts[0]});
    })
  }

  removeImage(){
    this.setState({ image:''});
  }

  componentWillReceiveProps(nextprops) {
    this.setState({pending:nextprops.project.pending});
    if (nextprops.errors) {
      this.setState({ errors: nextprops.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    var newProject = new FormData();
    newProject.append("image",this.state.attachment);   
    newProject.append("text", this.state.text);           
    newProject.append("type", this.state.type);   
    newProject.append("title", this.state.title);   
    this.props.addProject(newProject);
    this.setState({ text: '' ,title:'',image:'',attachment:'',type:this.state.options[0]});
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFileChange(e){
    var files = e.target.files || e.dataTransfer.files;
              if (!files.length)
                return;
    //console.log(files[0]);
    this.setState({ attachment: files[0]});
    this.createImage(files[0]);
  }

  createImage(file) {
    var reader = new FileReader();
    reader.onload = (e) => {
        this.setState({ image:e.target.result});
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { errors,options,image } = this.state;
    let imageContent;

    if (image === "") {
        imageContent = ( <div className="form-group">
                            <label>Upload Gambar (Optional): </label>
                            <div className="dropbox">
                                <input type="file" id="image" 
                                accept="image/*" className="input-file"  onChange={this.onFileChange.bind(this)} />
                                <p>
                                    Drag your file(s) here to begin<br /> or click to browse
                                </p>
                            </div>
                        </div>);
    } else {
        imageContent = (<div>
                            <img alt="gambar" src={image} style={{width:"100px"}} />
                            <button onClick={this.removeImage.bind(this)} type="button" >Remove image</button>
                        </div>
                        );
    }

    return (
      <div className="project-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            <i className="fa fa-hands-helping"></i> Buat Project Kolaborasi
          </div>
          <div className="card-body">
            <form encType="multipart/form-data" onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                    placeholder="Judul Projectmu"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                />
                <SelectListGroup
                  placeholder="Kategori Projekmu"
                  name="type"
                  value={this.state.type}
                  onChange={this.onChange}
                  options={options}
                  error={errors.type}
                  info="pilih Kategori agar permudah cari teman kolaborasi"
                /> 
                <TextAreaFieldGroup
                  placeholder="Deskripsikan Projectmu dan Apa yang kamu butuhkan"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
                {imageContent}
              </div>
              <button type="submit" className="btn btn-primary" disabled={this.state.pending}  >
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

ProjectForm.propTypes = {
  addProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  project: state.project,
  errors: state.errors
});

export default connect(mapStateToProps, { addProject })(ProjectForm);
