
import specialtySerive from '../services/specialtyService';

let createSpecialty = async(req, res)=>{
    try{
        let infor = await specialtySerive.createSpecialty(req.body); //query khi url ?id ->get , body khi khong co url->posy
        return res.status(200).json(infor)

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getAllSpecialty = async(req, res)=>{
    try{
        let infor = await specialtySerive.getAllSpecialty(); //query khi url ?id ->get , body khi khong co url->posy
        return res.status(200).json(infor)

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let handleDeleteSpecialty=async(req, res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await specialtySerive.deleteSpecialty(req.body.id);  
    return res.status(200).json(message);
}
let getDetailSpecialtyById =async (req, res)=>{
    try{
        let infor = await specialtySerive.getDetailSpecialtyById(req.query.id,req.query.location); //query khi url ?id ->get , body khi khong co url->posy
        return res.status(200).json(infor)

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let handleEditSpecialty= async(req, res)=>{
    let data = req.body; 
    let message=await specialtySerive.updateSpecialty(data);
    return res.status(200).json(message)
}
module.exports = {
    createSpecialty:createSpecialty,
    getAllSpecialty:getAllSpecialty,
    handleDeleteSpecialty:handleDeleteSpecialty,
    getDetailSpecialtyById:getDetailSpecialtyById,
    handleEditSpecialty:handleEditSpecialty,
}