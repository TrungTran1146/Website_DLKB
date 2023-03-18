import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import { FormattedMessage } from 'react-intl';
import DatePicker  from '../../../components/Input/DatePicker';
import {getAllPatientForDoctor,postsendRemedy} from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class ManagePatient extends Component {
   constructor(props){ 
        super(props);
        this.state={
            currentDate:moment(new Date()).startOf('day').valueOf(),
            dataPatient:[],
            isOpenRemedyModal: false,
            dataModal:{},
            isShowLoading:false
        }
   }
   async componentDidMount(){
       
        this.getDataPatient()
      
       
   }
   getDataPatient =async()=>{
        let {user} = this.props;
        let {currentDate} = this.state;
        let formatedDate  = new Date(currentDate).getTime();

        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date:formatedDate
        })
        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
            })
        }
   }

    async componentDidUpdate(prevProps,prevState, snapshot){
        if(this.props.language !== prevProps.language){
           
        }     
    }
    handleOnChangeDatePicker =(date)=>{
        this.setState({  
            currentDate: date[0]      
        },async()=>{ // callback:// bản chất hàm setstate là hàm bất đồng bộ, muốn lấy giá tri của nó một cách chính xác, thì viết callback sau khi setstate
          
           await this.getDataPatient()
        })
       
    }
    handlebtnConfirm = (item)=>{
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType:item.timeType,
            patientName:item.patientData.firstName
          
        }
       
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        })
      
    }
   
    closeRemedyModal = ()=>{
        this.setState({
            isOpenRemedyModal: false,
            dataModal:{},
        })
    }
    sendRemedy =async(dataChild)=>{
        let {dataModal} = this.state;
        this.setState({
            isShowLoading:true
        })
      
        let res = await postsendRemedy({
           // ...dataFromModal,
           email: dataChild.email,
           imgBase64: dataChild.imgBase64,
           doctorId: dataModal.doctorId,
           patientId: dataModal.patientId,
           timeType: dataModal.timeType,
           language:this.props.language,
           patientName: dataModal.patientName
        });
        if(res && res.errCode ===0){
            this.setState({
                isShowLoading:false
            })
            toast.success('Gửi đơn thuốc thành công');
            this.closeRemedyModal();
            await this.getDataPatient();
        }else{
            this.setState({
                isShowLoading:false
            })
            toast.error('Gửi đơn thuốc thất bại')
        }
    }
    render() {
        console.log("check userInfo",this.state);
        //console.log("check userInfo",this.props);
        let {dataPatient,isOpenRemedyModal,dataModal}= this.state;
        let {language}= this.props;
        return (
            <>
                 <LoadingOverlay
                    active = {this.state.isShowLoading}
                    spinner 
                    text='Vui lòng đợi trong giây lát ... '
                    >
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                        Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className='form-control'
                            value={this.state.currentDate}  
                            // minDate={yesterday}    // lấy ngày hiện tại, tắt chọn ngày quá khứ                
                            />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table style={{width:'100%'}}>
                            <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Thời gian</th>
                                <th>Họ và tên</th> 
                                <th><FormattedMessage id='manage-user.address'/></th>
                                <th><FormattedMessage id='manage-user.gender'/></th>
                                <th><FormattedMessage id='manage-user.phone-number'/></th>
                                <th>Trạng thái</th>

                            </tr>
                            {dataPatient && dataPatient.length >0 ? 
                                dataPatient.map((item,index)=>{
                                    let time = language === LANGUAGES.VI ?item.timeTypeDataPatient.valueVi : 
                                    item.timeTypeDataPatient.valueEn;
                                    let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi:
                                    item.patientData.genderData.valueEn
                                    return(
                                        <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{time}</td>
                                        <td>{item.patientData.firstName}</td>
                                        <td>{item.patientData.address}</td>
                                        <td>{gender}</td>
                                        <td>{item.patientData.phonenumber}</td>
                                        <td>
                                            <button className='mp-btn-confirm'
                                            onClick={()=>this.handlebtnConfirm(item)}>Xác nhận</button>
                                            {/* <button className='mp-btn-remedy'
                                            onClick={()=>this.handlebtnRemedy()}>Gửi hóa đơn</button> */}
                                        </td>
                                    </tr>
                                    )
                                })
                                : <tr>
                                    <td colSpan='7' style={{textAlign:'center'}}>Không có dữ liệu</td>
                                </tr>
                            }
                    
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
                <RemedyModal
                    isOpenModal={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}
                />
                </LoadingOverlay>
            </>
        );                
    }       
}

const mapStateToProps = state => {
    return {
        language : state.app.language,
        user:state.user.userInfo, // userInfo la thuoc tinh cua user reducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
