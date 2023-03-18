import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageSpecialty.scss';
import * as actions from "../../../store/actions";
import {ManageSpecialty} from '../../System/Specialty/ManageSpecialty';
import Lightbox from 'react-image-lightbox';
import {LANGUAGES,CommonUtils }from "../../../utils";
class TableManageSpecialty extends Component {

    constructor(props){
        super(props);
        this.state={
           SpecialtyRedux:[],
        }
    }
    componentDidMount(){
        this.props.fetchSpecialyRedux();
    }
    componentDidUpdate(prevProps,prevState, snapshot){
        if(prevProps.listSpecialty !== this.props.listSpecialty){
            this.setState({
                SpecialtyRedux: this.props.listSpecialty
            })
        }
    }
  
    handleDeleteUser = (SpecialtyId) =>{
         this.props.deleteSp(SpecialtyId.id)
        
    }
    handleEditUser = (user) =>{
        this.props.handleEditUserFromParentKey(user)
    }
    render() {
        let arrSpecialty = this.state.SpecialtyRedux;    
        //console.log('kk',this.state.SpecialtyRedux)
        return (
            <div className="users-container">
                <table id="customers">
                <tbody>
                        <tr>
                            <th>Tên chuyên khoa</th>           
                            <th>Actions</th>
                        </tr> 
                        {arrSpecialty && arrSpecialty.length >0 &&
                            arrSpecialty.map((item,index)=>{

                                return(
                                    <tr key={index}>  
                                    <td>{item.name}</td>
                                  
                                        
                                    
                                    <td>                                  
                                        <button className='btn-edit'onClick={()=>this.handleEditUser(item)}><i className="fas fa-edit"></i></button>
                                        <button className='btn-delete'onClick={()=>this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
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
        listSpecialty: state.admin.specialy
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSpecialyRedux:()=> dispatch(actions.fetchAllSpecialty()),
        deleteSp:(id)=>dispatch(actions.deleteSpecialty(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty);
