const Medi = require('../models/Medi')
module.exports = {
    getMedis: async (req,res)=>{
        try{
            const mediItems = await Medi.find({userId:req.user.id})
            //const mediItems = await Medi.find()
            const itemsLeft = await Medi.countDocuments({userId:req.user.id,completed: false})
            //const itemsLeft = await Medi.countDocuments({completed: false})
            const time = await Number(Medi.time)
            res.render('medi.ejs', {drug: mediItems, left: itemsLeft,user: req.user,time:time})
        }catch(err){
            console.log(err)
        }
    },
    createMedi: async (req, res)=>{
        try{
            await Medi.create({drug: req.body.mediItem, completed: false, userId: req.user.id, time:req.body.time,running:false})
            console.log('Medi has been added!')
            res.redirect('/medi')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Medi.findOneAndUpdate({_id:req.body.mediIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        const mediId = req.body.mediIdFromJSFile;
        try{
            await Medi.findOneAndUpdate({_id:req.body.mediIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            console.log(mediId)
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteMedi: async (req, res)=>{
        console.log(req.body.mediIdFromJSFile)
        try{
            await Medi.findOneAndDelete({_id:req.body.mediIdFromJSFile})
            console.log('Deleted Medi')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
   

    startTime: async (req,res)=>{
        const mediId = req.body.mediIdFromJSFile;
      
        const intervalId = setInterval(async () => {
          const medi = await Medi.findOne({_id: mediId});
          if (medi && !medi.running) {
            clearInterval(intervalId);
          } else {
            await Medi.findOneAndUpdate(
              {_id: mediId},
              {$inc: {time: -1}},
              {new: true}
            );
            console.log('Time Ticked');
          }
        },  60000);
      
        res.json('Time Ticked');
      },

        makeRunning:async(req,res)=>{
            console.log(req.body.mediIdFromJSFile)
            try {
                await Medi.findOneAndUpdate({_id:req.body.mediIdFromJSFile},{running:true})
                console.log('running')
                res.json('running')
            } catch (error) {
                console.log(err)
            }
        },
        notRunning:async(req,res)=>{
            try{
                await Medi.findOneAndUpdate({_id:req.body.mediIdFromJSFile},{
                    running: false
                })
                console.log('stopped ticking')
                res.json('stopped ticking')
            }catch(err){
                console.log(err)
            }
        },

        
}
  
