const {Schema, model} = require("mongoose")

const BSchema = new Schema({
	c: {
		type: Schema.Types.ObjectId,
		ref: 'C'
	}
})

const BModel = model('B', BSchema, 'B')
module.exports = BModel
