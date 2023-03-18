import clinicService from "../services/clinicService";

let createClinic = async(req, res)=>{
    try{
        let infor = await clinicService.createClinic(req.body); //query khi url ?id ->get , body khi khong co url->posy
        return res.status(200).json(infor)

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getAllClinic = async(req, res)=>{
    try{
        let infor = await clinicService.getAllClinic(); //query khi url ?id ->get , body khi khong co url->posy
        return res.status(200).json(infor)

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let handleDeleteClinic=async(req, res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await clinicService.deleteClinic(req.body.id);  
    return res.status(200).json(message);
}
let handleEditClinic= async(req, res)=>{
    let data = req.body; 
    let message=await clinicService.updateClinic(data);
    return res.status(200).json(message)
}

let getDetailClinicById =async(req, res)=>{
    try{
        let infor = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(infor)

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
module.exports={
    createClinic:createClinic,
    getAllClinic:getAllClinic,
    handleDeleteClinic:handleDeleteClinic,
    handleEditClinic:handleEditClinic,
    getDetailClinicById:getDetailClinicById
}