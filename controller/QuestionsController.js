const Question=require('../models/questions')
const Option=require('../models/options')

module.exports.create=async function(req,res){
//  in this the question are created
    console.log(req.url);
    console.log(req.body);
    await Question.create(req.body,function(err,ques){
            if(err){console.log("error in creating the question schema",err);}
    

        console.log(ques);
        res.send(ques);
})


}

module.exports.showDetails=async function(req,res){
        console.log(req.params.id)

        const ques=await Question.findById(req.params.id).populate('options')
        

        if(ques){
            res.send(ques);
        }
        // handling the bad requests if that id does not exist
        else{
            res.send("id does not exits");
        }

    

    // in this the details about the question is displayed
}

module.exports.deleteQues=async function(req,res){
    // in this the question will be deleted
            await Question.findByIdAndDelete(req.params.id)
            await Option.deleteMany({question:req.params.id}).clone().catch(function(err){ console.log(err)})
                res.send("ques deleted");

}
