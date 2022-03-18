const {Schema, model} = require("mongoose")

const ASchema = new Schema({
	b: {
		type: [Schema.Types.ObjectId],
		ref: 'B'
	}
})

const AModel = model('A', ASchema, 'A')
module.exports = AModel
