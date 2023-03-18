
import db from '../models/index';
import CRUDService from "../services/CRUDService";
let getHomePage =async(req, res) => {
    try{
        let data = await db.User.findAll();
       return res.render('homepage.ejs', {
        data:JSON.stringify(data)
       });
    }catch(e){
        console.log(e);
    }
}
 let getCRUD=(req,res) =>{
    return res.render('crud.ejs');  
 }  

//truyen du lieu vao file service
let postCRUD = async(req,res) =>{

    let massage  =await CRUDService.createNewUser(req.body);
    console.log(massage)
    return res.send('post crud from sever!!');
}
let displayGetCRUD =async(req,res) =>{
    let data= await CRUDService.getAllUser();  
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
   
}
let getEditCRUD= async(req,res) =>{
    let userId =req.query.id;   
    if(userId){
        let userData =await CRUDService.getUserInForById(userId);
       //kt  data not found

        //let userData
        return res.render('editCRUD.ejs',{
            user:userData
        });
    }
   else{
        return res.send('user not found');
   }
   
}
let putCRUD= async(req,res)=>{
    let data = req.body; 
    await CRUDService.updateUserData(data);
    return res.send('welldone');
}
let deleteCRUD = async(req, res) =>{
    let id = req.query.id;
    await CRUDService.deleteUserById(id);
    if(id){
        return res.send('delete user succeed')
    }
    else{
        return res.send('user not found')
    }
    

}
module.exports={
        getHomePage: getHomePage,
        getCRUD: getCRUD,
        postCRUD: postCRUD,
        displayGetCRUD: displayGetCRUD,
        getEditCRUD:getEditCRUD,
        putCRUD:putCRUD,
        deleteCRUD: deleteCRUD
}