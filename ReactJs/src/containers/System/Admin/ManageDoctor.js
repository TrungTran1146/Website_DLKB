import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props){
        super(props);
        this.state={
            //save to markdown table
            contentMarkdown:'',
            contentHTML:'',
            selectedOption:'',
            description:'',
            listDoctors: [],
            hasOldData: false,
        
            // save to doctor infor table
            listPrice:[],
            listPayment:[],
            listProvince:[],
            listClinic: [],
            listSpecialty:[],

            selectedPrice:'',
            selectedPaymennt:'',
            selectProvince:'',
            selectClinic:'',
            selectSpecialty:'',

            nameClinic:'',
            addressClinic:'',
            note:'',
            clinicId:'',
            specialtyId:'',
         
        } 
}
    componentDidMount() {
       this.props.fetchAllDoctors();
       this.props.getAllRequiredDoctorInfor();
    }
    componentDidUpdate(prevProps,prevState, snapshot){
       if(prevProps.allDoctors !== this.props.allDoctors){
        let dataSelect = this.buidDataInputSelect(this.props.allDoctors,'USERS')
        this.setState({
            listDoctors: dataSelect
        })
       }
       if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
        let {resPayment, resPrice, resProvince,resSpecialty,resClinic } = this.props.allRequiredDoctorInfor;

        let dataSelectPrice = this.buidDataInputSelect(resPrice,'PRICE');
        let dataSelectPayment = this.buidDataInputSelect(resPayment,'PAYMENT');
        let dataSelectProvince = this.buidDataInputSelect(resProvince,'PROVINCE');
        let dataSelectSpecialty = this.buidDataInputSelect(resSpecialty,'SPECIALTY');
        let dataSelectClinic = this.buidDataInputSelect(resClinic,'CLINIC')
        
       this.setState({
            listPrice: dataSelectPrice,
            listPayment: dataSelectPayment,
            listProvince: dataSelectProvince,
            listSpecialty: dataSelectSpecialty,
            listClinic:dataSelectClinic
       })
    }
    if(prevProps.language !== this.props.language){
        let dataSelect = this.buidDataInputSelect(this.props.allDoctors,'USERS')
        let {resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

        let dataSelectPrice = this.buidDataInputSelect(resPrice,'PRICE');
        let dataSelectPayment = this.buidDataInputSelect(resPayment,'PAYMENT');
        let dataSelectProvince = this.buidDataInputSelect(resProvince,'PROVINCE');
        this.setState({
            listDoctors: dataSelect,
            listPrice: dataSelectPrice,
            listPayment: dataSelectPayment,
            listProvince: dataSelectProvince,
    })    
   }
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
  }
  handleSaveContentMarkdown = () =>{
    let {hasOldData} = this.state;
   
    this.props.saveDetailDoctor({
        contentHTML: this.state.contentHTML,
        contentMarkdown: this.state.contentMarkdown,
        description: this.state.description,
        doctorId:this.state.selectedOption.value,
        action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

        selectedPrice: this.state.selectedPrice.value,
        selectedPaymennt: this.state.selectedPaymennt.value,
        selectProvince: this.state.selectProvince.value,
        nameClinic: this.state.nameClinic,
        addressClinic: this.state.addressClinic,
        note: this.state.note,
        clinicId:this.state.selectClinic && this.state.selectClinic.value? this.state.selectClinic.value : '',
        specialtyId: this.state.selectSpecialty.value
    })
   
  }

  handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let {listPayment,listPrice,listProvince,listSpecialty,listClinic} = this.state;
        let res = await getDetailInforDoctor(selectedOption.value);
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let markdown = res.data.Markdown;
            let addressClinic='',nameClinic='', note='',
            paymentId='',priceId='',provinceId='',specialtyId,clinicId,
            selectedPaymennt='',selectedPrice='',selectProvince='',selectSpecialty='',selectClinic='';
           
            if(res.data.Doctor_Infor){
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId=res.data.Doctor_Infor.paymentId;
                priceId=res.data.Doctor_Infor.priceId;
                provinceId=res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;

                selectedPaymennt = listPayment.find(item => {
                    return item && item.value === paymentId;
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId;
                })
                selectProvince = listProvince.find(item => {
                    return item && item.value === provinceId;
                })
                selectSpecialty = listSpecialty.find(item=>{
                    return item && item.value === specialtyId;
                })
                selectClinic = listClinic.find(item=>{
                    return item && item.value === clinicId;
                })

                
                // paymentId = res.data.Doctor_Infor.paymentId;
                // priceId = res.data.Doctor_Infor.priceId;
                // provinceId = res.data.Doctor_Infor.provinceId;

            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic:addressClinic,
                nameClinic: nameClinic,
                note:note,
                selectedPaymennt: selectedPaymennt,
                selectedPrice:selectedPrice,
                selectProvince:selectProvince,
                selectSpecialty:selectSpecialty,
                selectClinic:selectClinic,


            })
        }
        else{
            this.setState ({
                contentHTML: '',
                contentMarkdown:'',
                description: '',
                hasOldData: false,
                addressClinic:'',
                nameClinic: '',
                note:'',
                selectedPaymennt: '',
                selectedPrice:'',
                selectProvince:'',
                selectSpecialty:'',
                selectClinic:''
            })                 
        }
    }
    //thay vi viet handle on chang cho payment, price,province, thi viet ngan gon
    handleChangeSelectDoctorInfor = async(selectedOption,name) =>{
        let stateName = name.name;
        let stateCopy={...this.state};
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
        
    }
        
    
  handleOnChangeText = (event, id)=>{
    let stateCopy = {...this.state};
    stateCopy[id] = event.target.value
    this.setState({
        ...stateCopy
    })
  }
  buidDataInputSelect = (inputData, type) =>{
  
    let result = []; 
    let {language}= this.props;
    if(inputData && inputData.length >0){
        if(type ==='USERS' ){
            inputData.map((item,index)=>{
                let object = {};
                let labelVi =`${item.lastName} ${item.firstName}`;
                let labelEn =`${item.firstName} ${item.lastName}`;
    
                object.label = language ===LANGUAGES.VI ? labelVi: labelEn;
                object.value= item.id;
                result.push(object)
            })
        }  
        if(type ==='PRICE'){
            inputData.map((item,index)=>{
                let object = {};
                let labelVi =`${item.valueVi}`;
                let labelEn =`${item.valueEn} USD`;
    
                object.label = language ===LANGUAGES.VI ? labelVi: labelEn;
                object.value= item.keyMap;
                result.push(object)
            })
        }
        if(type === 'PAYMENT' || type === 'PROVINCE'){
            inputData.map((item,index)=>{
                let object = {};
                let labelVi =`${item.valueVi}`;
                let labelEn =`${item.valueEn}`;
    
                object.label = language ===LANGUAGES.VI ? labelVi: labelEn;
                object.value= item.keyMap;
                result.push(object)
            })
        }
        if(type === 'SPECIALTY'){
            inputData.map((item,index)=>{
                let object = {};
                object.label = item.name;
                object.value= item.id;
                result.push(object)
            })
        }
        if(type === 'CLINIC'){
            inputData.map((item,index)=>{
                let object = {};
                object.label = item.name;
                object.value= item.id;
                result.push(object)
            })
        }
    }
    return result;
  }
    render(){
        let {hasOldData} = this.state;
        console.log("check state", this.state)
        return (
            <div className='manage-doctor-container'>
                
                 <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title"/>
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor"/></label>
                        <Select
                             value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                             options={this.state.listDoctors}   
                             placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor"/>}     
                                      
                         />
                    </div>
                    <div className='content-right'>
                    <label><FormattedMessage id="admin.manage-doctor.infor-doctor"/></label>
                        <textarea className='form-control'
                            onChange={(event)=>this.handleOnChangeText(event,'description')}
                            value={this.state.description}>
                          
                        </textarea>
                    </div>
                  
                </div>
                <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.price"/></label>
                             <Select
                             value={this.state.selectedPrice}
                             onChange={this.handleChangeSelectDoctorInfor}
                             options={this.state.listPrice}   
                             placeholder={<FormattedMessage id="admin.manage-doctor.price"/>}  
                             name="selectedPrice"                      
                         />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.payment"/></label>
                            <Select
                            value={this.state.selectedPaymennt}
                            onChange={this.handleChangeSelectDoctorInfor}
                             options={this.state.listPayment}   
                             placeholder={<FormattedMessage id="admin.manage-doctor.payment"/>}    
                             name="selectedPaymennt"                    
                         />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.province"/></label>
                            <Select
                            value={this.state.selectProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                             options={this.state.listProvince}   
                             placeholder={<FormattedMessage id="admin.manage-doctor.province"/>}    
                             name="selectProvince"                    
                         />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.nameClinic"/></label>
                            <input className='form-control'
                               onChange={(event)=>this.handleOnChangeText(event,'nameClinic')}
                               value={this.state.nameClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.roomAddress"/></label>                         
                            <input className='form-control'
                                onChange={(event)=>this.handleOnChangeText(event,'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.note"/></label>
                            <input className='form-control'
                                onChange={(event)=>this.handleOnChangeText(event,'note')}
                                value={this.state.note} 
                            />
                        </div>
                       
                </div>
                <div className='row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.speciality"/></label>
                        <Select
                            value={this.state.selectSpecialty}
                            options={this.state.listSpecialty}   
                            placeholder={<FormattedMessage id="admin.manage-doctor.speciality"/>}    
                            onChange={this.handleChangeSelectDoctorInfor}     
                            name="selectSpecialty"                                       
                         />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.Select-clinic"/></label>
                        <Select
                            value={this.state.selectClinic}
                            options={this.state.listClinic}   
                            placeholder={<FormattedMessage id="admin.manage-doctor.Select-clinic"/>}    
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectClinic"                                       
                         />
                    </div>

                </div>            
                <div className='mannage-doctor-editor'>
                     <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)}
                      onChange={this.handleEditorChange} 
                      value={this.state.contentMarkdown}
                     />
                </div> 
               
                <button  onClick={()=>this.handleSaveContentMarkdown()}
                className={hasOldData===true?'save-content-doctor' : 'create-content-doctor'}   >
                    {hasOldData===true ?
                        <span><FormattedMessage id="admin.manage-doctor.save-infor"/></span> 
                        : <span><FormattedMessage id="admin.manage-doctor.create-infor"/></span>   
                    }
                </button> 
               
           </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language : state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors:()=>dispatch(actions.fetchAllDoctors()),
        getAllRequiredDoctorInfor:()=>dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor:(data)=>dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
