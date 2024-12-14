const mongoose=require('mongoose');
module.exports.careerDetails = async (req, res) => {
  try {
    const careers = await mongoose.connection.db.collection('careers').find().toArray();
    // console.log("careers", careers);
    res.status(200).json({ success: true, data: careers });
  } catch (e) {
    console.error("Error fetching career details", e);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch career details" });
  }
};

module.exports.getIndCareerDetails=async(req,res)=>{
    const {id}=req.params;
    try{
        const career=await mongoose.connection.db.collection('careers').findOne({_id:new mongoose.Types.ObjectId(id)});
        if(!career){
            return res.status(404).json({success:false,message:"Career not found"});
        }
        console.log("ind-career",career);
        res.status(200).json({success:true,data:career})

    }catch(e){
        console.error("Error fetching career details", e);
        res
         .status(500)
         .json({ success: false, message: "Failed to fetch individual career details" });
    }
}
