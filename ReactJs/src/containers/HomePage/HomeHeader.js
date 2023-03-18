import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.svg';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../utils";
import {withRouter} from 'react-router';
import {changeLanguageApp} from '../../store/actions'
class HomeHeader extends Component {

    changeLanguage=(language)=>{
        this.props.changeLanguageAppRedux(language)
    }
    returnToHome = ()=>{
        if(this.props.history){
            this.props.history.push(`/home`)
        }
    }
    render() {
       let language=this.props.language;
      
        return (
            <React.Fragment>
           <div className='home-header-container'>
            <div className='home-header-content'>
                <div className='left-content'>
                     {/* <i className="fas fa-caret-circle-down"></i> */}
                     <i className="fas fa-caret-square-down"></i>
                     <img className='header-logo' src={logo} onClick={()=>this.returnToHome()}/>
                   
                     
                </div>
                <div className='center-content'>
                    <div className='child-content'>
                        <div><b><FormattedMessage id="homeheader.speciality"/></b></div>
                        <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor"/></div>
                    </div>
                    <div className='child-content'>
                        <div><b><FormattedMessage id="homeheader.health-facility"/></b></div>
                        <div className='subs-title'><FormattedMessage id="homeheader.select-room"/></div>
                    </div>
                    <div className='child-content'>
                        <div><b><FormattedMessage id="homeheader.doctor"/></b></div>
                        <div className='subs-title'><FormattedMessage id="homeheader.select-doctor"/></div>
                    </div>
                    <div className='child-content'>
                        <div><b><FormattedMessage id="homeheader.select-fee"/></b></div>
                        <div className='subs-title'><FormattedMessage id="homeheader.check-health"/></div>
                    </div>
                </div>
                <div className='right-content'>
                    <div className='sp'><i className="fas fa-question-circle"></i>
                    <FormattedMessage id="homeheader.support"/></div>
                    <div className={language===LANGUAGES.VI?'language-vi active': 'language-vi'}><span onClick={()=>this.changeLanguage(LANGUAGES.VI)}>VN</span></div>  
                    <div className={language===LANGUAGES.EN?'language-en active': 'language-en'}><span onClick={()=>this.changeLanguage(LANGUAGES.EN)}>EN</span></div>                
                </div> 
            </div>          
           </div>
           {this.props.isShowBanner===true && 
           <div className='home-header-banner'>
            <div className='content-up'>
                <div className='title1'><FormattedMessage id="banner.title1"/></div>
                <div className='title2'><FormattedMessage id="banner.title2"/></div>
                <div className='search'>
                    <i className="fas fa-search"></i>
                    <input type='text'placeholder='Tìm bác sĩ khám bệnh'/>                  
                </div>
            </div>
            <div className='content-down'>
                <div className='options'>
                    <div className='options-child'>
                        <div className='icon-child'><i className="far fa-hospital"></i></div>
                        <div className='text-child'><FormattedMessage id="banner.title3"/></div>
                    </div>
                    <div className='options-child'>
                        <div className='icon-child'><i className="fa fa-mobile" aria-hidden="true"></i></div>
                        <div className='text-child'><FormattedMessage id="banner.title4"/></div>
                    </div>
                    <div className='options-child'>
                        <div className='icon-child'><i className="fas fa-procedures"></i></div>
                        <div className='text-child'><FormattedMessage id="banner.title5"/></div>
                    </div>
                    <div className='options-child'>
                        <div className='icon-child'><i className="fas fa-flask"></i></div>
                        <div className='text-child'><FormattedMessage id="banner.title6"/></div>
                    </div>
                    <div className='options-child'>
                        <div className='icon-child'><i className="fas fa-walking"></i></div>
                        <div className='text-child'><FormattedMessage id="banner.title7"/></div>
                    </div>
                    <div className='options-child'>
                        <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                        <div className='text-child'><FormattedMessage id="banner.title8"/></div>
                    </div>
                    
                </div>
            </div>
                
        </div>
        }
           </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language : state.app.language,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux:(language)=>dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
