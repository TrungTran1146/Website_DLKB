import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';

import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker  from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import {saveBulkScheduleDoctor} from '../../../services/userService';
class ManageSchedulead extends Component {
    constructor(props){
        super(props);
       
        this.state={
            listDoctors:[],
            selectedDoctor:{},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount(){
        this.props.fetchUserRedux();
        this.props.fetchAllScheduleTime();
    }  
    componentDidUpdate(prevProps,prevState, snapshot){
        //let dataSelect = this.fetchUserRedux(this.userInfo.id)
      
        if(prevProps.userInfo !== this.props.userInfo){
            let dataSelect = this.fetchUserRedux(this.props)
            this.setState({
                listDoctors: dataSelect
            })
           
           }
         if(prevProps.allScheduleTime !== this.props.allScheduleTime){
         
            let data = this.props.allScheduleTime;
            if(data && data.length >0 ){         
                data= data.map(item=>({...item,isSelected: false}))
            }
            
            this.setState({
                rangeTime: data
            })
         }  
        //    if(prevProps.language !== this.props.language){
        //         let dataSelect = this.buidDataInputSelect(this.props.allDoctors)
        //         this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }   
    buidDataInputSelect = (inputData) =>{
  
        let result = []; 
        let {language}= this.props;
        if(inputData && inputData.length >0){
            inputData.map((item,index)=>{
                let object = {};
                let labelVi =`${item.lastName} ${item.firstName}`;
                let labelEn =`${item.firstName} ${item.lastName}`
    
                object.label = language ===LANGUAGES.VI ? labelVi: labelEn;
                object.value= item.id;
                result.push(object)
            })
           
        }
        return result;
    } 
    handleChangeSelect = async (userInfo) => {
        this.setState({ selectedDoctor: userInfo  });
       
    }
    handleOnChangeDatePicker =(date)=>{
        this.setState({
            currentDate: date[0] // mảng trả về arr, lấy phần tử đầu tiền của arr
        })
       
    }
    handleClickBtnTime =(time) =>{
        
        let {rangeTime} = this.state; //lấy tất cả lưu trữ trong mảng
       
        if(rangeTime && rangeTime.length >0){ //lặp mảng
            rangeTime= rangeTime.map(item =>{ // dung map lập từng phần tử 1
                if(item.id===time.id) item.isSelected=!time.isSelected;    // kt xem phần tử nào trong mảng rangetime có id là chính thời gian của click  
                return item;  //nếu có thì chuyển biến của phần tử đó selected=true, sau đó trả lại phần tử
            })
            this.setState({
                rangeTime:rangeTime
            })
           
        }
    }
    handleSaveSchedule =async () =>{
        let {rangeTime,selectedDoctor, currentDate} = this.state;
        let {userInfo}= this.props;
        let result=[];
        if(!currentDate){
            toast.error("Invalid date!");
            return;
        }
      
        
        let formatedDate =  new Date(currentDate).getTime();
        
        if(rangeTime && rangeTime.length > 0){
            let selectTime = rangeTime.filter(item =>item.isSelected===true);
                       
            if(selectTime && selectTime.length >0){
                selectTime.map(schedule=>{
                    let object = {};
                    object.doctorId  =userInfo.id ; //trong thư viện select trả ra value và lable
                    object.date  = formatedDate; 
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
                
            }else{
                toast.error("Invalid selected time!");
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId:userInfo.id,
            formatedDate: formatedDate
        });
        console.log('check result',result)
        if(res && res.errCode === 0){
            toast.success("Save Bulk Schedule Doctor Success!");
        }else{
            toast.error("Save Bulk Schedule Doctor Failed!");
            console.log("check Save Bulk Schedule Doctor ",res)
        }
    }
    
    render() {
        
        let {rangeTime} = this.state;
        let {language} = this.props;
        let {userInfo}= this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        console.log('kkk', this.props.userInfo)
        console.log("check state rangtime",rangeTime)
        return (
           <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title"/>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor"/></label>
                            <input className='form-control'
                             defaultValue= {`${userInfo.lastName} ${userInfo.firstName}`}    
                             disabled                    
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-date"/></label>
                            <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className='form-control'
                            value={this.state.currentDate}  
                            minDate={yesterday}     // lấy ngày hiện tại, tắt chọn ngày quá khứ                
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 && 
                                rangeTime.map((item,index)=>{
                                    return(
                                        <button 
                                            className={item.isSelected===true
                                                ? 'btn btn-schedule active' : "btn btn-schedule" }                                          
                                            key={index}
                                            onClick={()=>this.handleClickBtnTime(item)}
                                            >
                                            {language===LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                        <button className='btn btn-primary btn-save-schedule'
                            onClick={()=>this.handleSaveSchedule()}
                        >
                            <FormattedMessage id="manage-schedule.save"/>
                        </button>
                        </div>
                       
                    </div>
                </div>
           </div>
              
          
        );
    }
}

const mapStateToProps = state => {
    return {
        language : state.app.language,
        allDoctors: state.admin.allDoctors,
        isLoggedIn: state.user.isLoggedIn,
        allScheduleTime: state.admin.allScheduleTime,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: ()=> dispatch(actions.fetchAllUserStart()),
        fetchAllScheduleTime:()=>dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedulead);
