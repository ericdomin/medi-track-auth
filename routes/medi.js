const express = require('express')
const router = express.Router()
const mediController = require('../controllers/medi')

router.get('/', mediController.getMedis)

router.post('/createMedi', mediController.createMedi)

router.put('/startTime', mediController.startTime)

router.put('/markComplete', mediController.markComplete)

router.put('/markIncomplete', mediController.markIncomplete)

router.delete('/deleteMedi', mediController.deleteMedi)

router.put('/makeRunning',mediController.makeRunning)

router.put('/notRunning',mediController.notRunning)



module.exports = router