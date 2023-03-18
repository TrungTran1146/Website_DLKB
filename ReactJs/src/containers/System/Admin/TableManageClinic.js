import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageSpecialty.scss';
import * as actions from "../../../store/actions";
import {ManageSpecialty} from '../../System/Specialty/ManageSpecialty';
import Lightbox from 'react-image-lightbox';
import {LANGUAGES,CommonUtils }from "../../../utils";
class TableManageClinic extends Component {

    constructor(props){
        super(props);
        this.state={
           ClinicRedux:[],
        }
    }
    componentDidMount(){
        this.props.fetchClinicRedux();
    }
    componentDidUpdate(prevProps,prevState, snapshot){
        if(prevProps.listClinic !== this.props.listClinic){
            this.setState({
                ClinicRedux: this.props.listClinic
            })
        }
    }
  
    handleDeleteClinic = (ClinicId) =>{
         this.props.deleteClinic(ClinicId.id);
        
        
    }
    handleEditClinic = (clinic) =>{
        this.props.handleEditClinicFromParentKey(clinic)
    }
    render() {
        let arrClinic = this.state.ClinicRedux;    
        //console.log('kk',this.state.SpecialtyRedux)
        return (
            <div className="users-container">
                <table id="customers">
                <tbody>
                        <tr>
                            <th>Tên chuyên khoa</th> 
                            <th>Địa chỉ</th>          
                            <th>Actions</th>
                        </tr> 
                        {arrClinic && arrClinic.length >0 &&
                            arrClinic.map((item,index)=>{

                                return(
                                    <tr key={index}>  
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                  
                                        
                                    
                                    <td>                                  
                                        <button className='btn-edit'onClick={()=>this.handleEditClinic(item)}><i className="fas fa-edit"></i></button>
                                        <button className='btn-delete'onClick={()=>this.handleDeleteClinic(item)}><i className="fas fa-trash"></i></button>
                                    </td>
                                    </tr>
                                )
                            })
                        }                       
                                                  
                        </tbody>   
                                                   
                        </table>
                       
                </div>
                
        );
    }

}

const mapStateToProps = state => {
    return {
        listClinic: state.admin.clinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinicRedux:()=> dispatch(actions.fetchAllClinic()),
        deleteClinic:(id)=>dispatch(actions.deleteClinic(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
