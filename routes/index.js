var express = require('express')
var router = express.Router()
const mongoose = require('mongoose')
const A = require('../models/a')
const B = require('../models/b')
const C = require('../models/c')

mongoose.connect(
  'mongodb://localhost:27017',
  { dbName: 'test-remove' },
  (err) => {
    console.log(err)
  }
)

/* GET home page. */
router.get('/', async function (_req, res, next) {
  // to nest populating, we use the object version of populate
  const foundAs = await A.findOne().populate({
    path: 'b',
    populate: {
      path: 'c',
      populate: {
        path: 'd',
      },
    },
  })
  res.json(foundAs)
})

router.post('/', async (req, res, next) => {
  // we create 2 Cs that have a "d" in each of them, with text values
  const c1 = await C.create({ d: 'Something' })
  const c2 = await C.create({ d: 'SomethingElse' })
  // We create 2 Bs with a c referenced in each of them
  const b1 = await B.create({ c: c1._id })
  const b2 = await B.create({ c: c2._id })
  const createdAs = await A.create([{ b: [b1._id, b2._id] }])
  res.json(createdAs)
})

router.delete('/', async (req, res, next) => {
  try {
    const foundA = await A.findOne()
    const foundB = await B.findOne()
    foundA.b.remove(foundB._id) // doesn't do anything to the b MongooseArray (Special Array)
    // SAME but slightly slower
    foundA.b = foundA.b.splice(foundA.b.indexOf(foundB._id), 1)
    // SAME but faster
    foundA.b = foundA.b.filter((bItem) => !bItem._id.equals(foundB._id))
    await foundA.save()
    const foundASecondTime = await A.find().populate('b').populate('b.c')
    res.json(foundASecondTime)
  } catch (err) {
    console.log('ERROR:', err)
    res.status(500).json(err)
  }
})
module.exports = router
