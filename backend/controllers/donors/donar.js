import Donar from "../../models/Donar_Schema.js";

const donar = async(req,resp) => {
    try{
        const donarData = new Donar({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            donarEmail: req.body.donarEmail,
            donarPhoneNo: req.body.donarPhoneNo,
            amount: req.body.amount,
            message: req.body.message,
            donationDate: req.body.donationDate
          });

          let donarResult = await donarData.save();

          return resp.status(201).json({donarResult});
    }
    catch(err)
    {
        console.log(err);
        return resp.status(401).json({ message: "Error occured" });        
    }
}

export default donar