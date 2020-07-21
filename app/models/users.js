const mongoose = require('mongoose')

const { Schema, model } = mongoose

const usersSchema = new Schema({
  __v: { type:Number, select:false  },
  //名字
  name: { type:String, required:true },
  //密码
  password: { type:String, required:true, select:false },
  //头像
  avatar_url: { type: String },
  //性别
  gender: { type: String, enum: ['male', 'female'], default: 'male', required: true },   
  //一句话 
  headline: { type: String },
  //位置                                                            
  locations: { type: [{ type: String }], select: false },
  //行业                             
  business: { type: String},
  //职业                                                     
  occupation: {type: String},
  //教育
  educations: {
    type: [{
      school: { type: String },//学校
      major: { type: String },//专业
      diploma: { type: Number, enum: [1, 2, 3, 4, 5] },//学历
      entrance_year: { type: Number },//入学
      graduation_year: { type: Number },//毕业
    }],
    select: false,
  },                
  introduce: { type: String }//个人简介                        
})

module.exports = model('user', usersSchema)