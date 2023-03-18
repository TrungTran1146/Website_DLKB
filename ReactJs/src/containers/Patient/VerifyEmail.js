import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.scss';
import { FormattedMessage } from 'react-intl';
import {postVerifyBookAppointment} from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
class VerifyEmail extends Component {
   constructor(props){ 
        super(props);
        this.state={
            statusVerify:false,
            errCode:0,
        }
   }
   async componentDidMount(){
    if(this.props.location && this.props.location.search){
        let urlParams = new URLSearchParams(this.props.location.search);
        let token = urlParams.get('token');
        let doctorId = urlParams.get('doctorId');
        let res = await postVerifyBookAppointment({
            token:token,
            doctorId:doctorId,
        }) 
        if(res && res.errCode ===0){
            this.setState({
                statusVerify:true,
                errCode:res.errCode
            })
        }else{
            this.setState({
                statusVerify:true,
                errCode:res && res.errCode ? res.errCode : -1
            })         
        }
    }
   }

    async componentDidUpdate(prevProps,prevState, snapshot){
        if(this.props.language !== prevProps.language){
           
        }     
    }

    render() {
       let {statusVerify,errCode}= this.state;
        console.log("check verify",this.state)
        return (
            <>
                <HomeHeader/>
                <div className='verify-email-container'>
                {statusVerify === false ?
                  <div>
                    Loading data

                  </div> 
                   :
                   <div>
                        {+errCode ===0 ? <div className='infor-booking'>Xác nhận lịch hẹn thành công </div>                                   
                            :
                        <div className='infor-booking'>Lịch hẹn không tồn tại hoặc đã được xác nhận</div>}
                      
                       
                   </div>
                }
                <div className='noteBooking'>Lưu ý:</div>
                <div className='title2'>Một bệnh nhân chỉ đặt được 1 bác sĩ trong cùng một ngày</div>
                <div className='title2'>Bệnh nhận khám bệnh vui lòng đi sớm trước thời gian đặt 10p để chúng tôi phục vụ tốt hơn,
                trường hợp đến trễ quá 5p thì lịch hẹn sẽ bị hủy. Xin chân thành cảm ơn !</div>
                
               </div>
            </>
                   
        );                
    }       
}

const mapStateToProps = state => {
    return {
        language : state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
