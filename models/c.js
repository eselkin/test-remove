const {Schema, model} = require("mongoose")

const CSchema = new Schema({
	d:{
		type: String,
		required: true
	}

})

const CModel = model('C', CSchema, 'C')
module.exports = CModel
