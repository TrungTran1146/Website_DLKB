const db = require("../models");

let createSpecialty =(data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown){
                resolve({
                errCode:1,
                errMessage:'Missing paremeter'
                })
            }else{
                await db.Specialty.create({
                    name:data.name,
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
let getAllSpecialty = ()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let data = await db.Specialty.findAll();
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
let deleteSpecialty = (SpecialtyId)=>{
    return new Promise(async(resolve, reject)=>{
        let foundSpecialty= await db.Specialty.findOne({
            where: {id: SpecialtyId}
        })
        if(!foundSpecialty){
            resolve({
                errCode:2,
                errMessage:'The user isnt exsit'
            })
        }
      
        await db.Specialty.destroy({
            where: {id: SpecialtyId}
        })
      
        resolve({
            errCode:0,
            message:'The user is deleted'
        })
    })
}
let getDetailSpecialtyById =(inputId,location)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            if(!inputId || !location){
                resolve({
                errCode:1,
                errMessage:'Missing paremeter'
                })
            }else{            
                 let data = await db.Specialty.findOne({
                    where: {
                        id:inputId
                    },
                    attributes:['descriptionHTML','descriptionMarkdown'],
                })

                if(data){
                    let doctorSpecialty = [];
                    if(location === 'ALL'){
                        doctorSpecialty= await db.Doctor_Infor.findAll({
                            where: {SpecialtyId: inputId},
                            attributes:['doctorId','provinceId'],
                        })
                    }else{
                        //find by location
                        doctorSpecialty= await db.Doctor_Infor.findAll({
                            where: {SpecialtyId: inputId,
                                    provinceId: location},                        
                            attributes:['doctorId','provinceId'],
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty; 
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
let updateSpecialty = (data) =>{
    return new Promise(async(resolve, reject)=>{
        try{
            // if(!data.image || !data.name ){
            //     resolve({
            //         errCode:2,
            //         errMessage:'Miss required parameter'
            //     }) 
            // }
            let Specialty= await db.Specialty.findOne({
                where: { id: data.id},
                raw:false
            })
            if(Specialty){    
                Specialty.name=  data.name; 
                Specialty.image=data.imageBase64;
                Specialty.descriptionHTML=data.descriptionHTML;
                Specialty.descriptionMarkdown=data.descriptionMarkdown;
                // if(data.avatar){
                //     Specialty.image= data.image;
                // }
               
                await Specialty.save();    
                // await db.User.save(
                // {
                //     firstName: data.firstName,
                //     lastName:data.lastName,
                //     address:data.address   
                // },{where:{id:userId}})
                resolve({
                    errCode:0,
                    message:'update the user succeeds'
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
module.exports={
    createSpecialty:createSpecialty,
    getAllSpecialty:getAllSpecialty,
    deleteSpecialty:deleteSpecialty,
    getDetailSpecialtyById:getDetailSpecialtyById,
    updateSpecialty:updateSpecialty
}