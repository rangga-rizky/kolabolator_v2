import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {deleteEducation} from '../../actions/profileAction'

class Education extends Component {
   
   onDeleteClick(id){
    this.props.deleteEducation(id)
   }

   render() {
   const education = this.props.education.map(exp => (
        <tr key={exp._id}>
            <td>{exp.school}</td>
            <td>{exp.deegre}</td>
            <td> 
                <Moment format="MM/DD/YY">{exp.from}</Moment> - {' '}
                {exp.to === null ? ("Sekarang") : (<Moment format="MM/DD/YY">{exp.to}</Moment>)}
            </td>
            <td><button onClick={this.onDeleteClick.bind(this,exp._id)} className="btn btn-danger">Hapus</button></td>
        </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education</h4>
        <table className="table">
            <thead>
                <tr>
                    <th>Institusi</th>
                    <th>Jenjang</th>
                    <th>Tahun</th>
                </tr>
            </thead>
            <tbody>
            {education}
            </tbody>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired,
}  

export default connect(null,{deleteEducation})(Education);
