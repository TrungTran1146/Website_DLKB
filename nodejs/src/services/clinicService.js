const db = require("../models");

let createClinic =(data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown || !data.address){
                resolve({
                errCode:1,
                errMessage:'Missing paremeter'
                })
            }else{
                await db.Clinic.create({
                    name:data.name,
                    address:data.address,
                    image: data.imageBase64,
                    descriptionHTML:data.descriptionHTML,
                    descriptionMarkdown:data.descriptionMarkdown
                })
                resolve({
                    errCode:0,
                    errMessage:'Tao Moi Thanh cong'
                })
            }
        }catch(e){
            reject(e);
        }
    })
}
let getAllClinic = ()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let data = await db.Clinic.findAll();
            if(data && data.length >0){
                data.map(item =>{
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })       
            }
            resolve({
                errCode:0,
                errMessage:'OK',
                data
            })

        }catch(e){
            reject(e);
        }
       
    })
}
let deleteClinic = (clinicId)=>{
    return new Promise(async(resolve, reject)=>{
        let foundSpecialty= await db.Clinic.findOne({
            where: {id: clinicId}
        })
        if(!foundSpecialty){
            resolve({
                errCode:2,
                errMessage:'The user isnt exsit'
            })
        }
      
        await db.Clinic.destroy({
            where: {id: clinicId}
        })
      
        resolve({
            errCode:0,
            message:'The user is deleted'
        })
    })
}
let updateClinic = (data) =>{
    return new Promise(async(resolve, reject)=>{
        try{
            let Clinic= await db.Clinic.findOne({
                where: { id: data.id},
                raw:false
            })
            if(Clinic){    
                Clinic.name= data.name; 
                Clinic.address=data.address;
                Clinic.image=data.imageBase64;
                Clinic.descriptionHTML=data.descriptionHTML;
                Clinic.descriptionMarkdown=data.descriptionMarkdown;     
                await Clinic.save();
                resolve({
                    errCode:0,
                    message:'update the clinic succeeds'
                })                        
            }else{
                resolve({
                    errCode:1,
                    errMessage:'User not find'
                });
            }             
        }catch(e){
            reject(e);
        }
    })
} 
let getDetailClinicById =(inputId)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            if(!inputId ){
                resolve({
                errCode:1,
                errMessage:'Missing paremeter'
                })
            }else{            
                 let data = await db.Clinic.findOne({
                    where: {
                        id:inputId
                    },
                    attributes:['name','address','descriptionHTML','descriptionMarkdown'],
                })

                if(data){
                    let doctorClinic = [];
                 
                        doctorClinic= await db.Doctor_Infor.findAll({
                            where: {clinicId: inputId},
                            attributes:['doctorId','provinceId'],
                        })        
                    data.doctorClinic = doctorClinic; 
                }else data={}
                resolve({
                    errMessage:'ok',
                    errCode:0,
                    data
                }) 
            }
        }catch(e){
            reject(e);
        }
    })
}
module.exports={
    createClinic:createClinic,
    deleteClinic:deleteClinic,
    getAllClinic:getAllClinic,
    updateClinic:updateClinic,
    getDetailClinicById:getDetailClinicById
}