import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {LANGUAGES,CommonUtils,CRUD_ACTIONS }from "../../../utils";
import { createNewSpecialty} from '../../../services/userService';
import { toast } from 'react-toastify';
import TableManageSpecialty from '../../System/Admin/TableManageSpecialty';
import * as actions from "../../../store/actions";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
   constructor(props){ 
        super(props);
        this.state={
            name:'',
            imageBase64:'',
            descriptionHTML:'',
            descriptionMarkdown:'',     
            SpecialtyEditId:'',    
            previewImgURL:'',   
            isOpen: false,
        }
   }
   async componentDidMount(){
      
   }

    async componentDidUpdate(prevProps,prevState, snapshot){
        if(this.props.language !== prevProps.language){
           
        }     
    }
    handleOnChangeImage =async (event)=>{
        let data= event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                imageBase64:base64
            })            
        }
        
    }
    openPreviewImage=()=>{
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleOnchangeInput = (event,id)=>{
        let stateCopy ={...this.state}
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({     
            descriptionHTML:html,
            descriptionMarkdown:text, 
        })
    }
    handleSaveNewSpecialty = async()=>{
        let res = await createNewSpecialty(this.state)
        if(res && res.errCode ===0){
            toast.success("Add new specialty Success!");
            this.setState({
                name:'',
                imageBase64:'',
                descriptionHTML:'',
                descriptionMarkdown:'',   
            })
            this.props.fetchSpecialyRedux();
        }else{
            toast.error("Add new specialty Error!");
            console.log("check res", res);
        }
        
    }
    handleEditUserFromParent=(user)=>{
        let imageBase64 ='';
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            
            name: user.name,
            imageBase64:'' ,
            descriptionHTML: user.descriptionHTML,
            descriptionMarkdown: user.descriptionMarkdown,
            previewImgURL:user.image,
            action: CRUD_ACTIONS.EDIT,
            SpecialtyEditId: user.id

        })
        console.log('user',user)
    }
    handleSaveEditSpecialty =()=>{
        let {action} = this.state;
        if(action === CRUD_ACTIONS.EDIT){
            //fire redux edit user
            this.props.fetchEditSpecialyRedux({
            id: this.state.SpecialtyEditId,
            name: this.state.name,
            imageBase64: this.state.previewImgURL,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
            
            })
        }
    }
    render() {
       let data = this.state;
       console.log('kk',data)
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>
                
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input className='form-control' type='text' value={this.state.name}
                        onChange={(event)=>this.handleOnchangeInput(event,'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
                        {/* <input className='form-control-file' type='file'/> */}
                        <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event)=>this.handleOnChangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                        onClick={()=>this.openPreviewImage()}
                                    >
                                    </div>
                                </div>                                
                    </div>
                    <div className='col-12'>
                          <MdEditor style={{ height: '300px' }} 
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange} 
                           value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'onClick={()=>this.handleSaveNewSpecialty()}>Lưu mới</button>
                        <button className='btn-save-specialty'onClick={()=>this.handleSaveEditSpecialty()}>Lưu thay đổi</button>
                    </div>

                   
                </div>
               
                {this.state.isOpen===true &&                           
                    <Lightbox
                        mainSrc={this.state.previewImgURL}            
                        onCloseRequest={() => this.setState({ isOpen: false })}         
                    />
                } 
                <div>
                    <TableManageSpecialty
                         handleEditUserFromParentKey={this.handleEditUserFromParent}
                         action={this.state.action}
                    />
                   
                </div>        
            </div>
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
        fetchSpecialyRedux:()=> dispatch(actions.fetchAllSpecialty()),
        fetchEditSpecialyRedux:(data)=> dispatch(actions.editSpecialty(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
