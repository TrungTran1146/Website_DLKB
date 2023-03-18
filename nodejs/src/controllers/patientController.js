import patientService from "../services/patientService"
let  postBookAppointment = async(req, res) =>{
    try{
        let infor = await patientService.postBookAppointment(req.body); //query khi url ?id ->get , body khi khong co url->posy
        return res.status(200).json(infor)

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let  postVerifyBookAppointment = async(req, res) =>{
    try{
        let infor = await patientService.postVerifyBookAppointment(req.body); //query khi url ?id ->get , body khi khong co url->posy
        return res.status(200).json(infor)

    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
module.exports = {
    postBookAppointment:postBookAppointment,
    postVerifyBookAppointment:postVerifyBookAppointment
}