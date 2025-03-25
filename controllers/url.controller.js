import shortid from "shortid";
import { URL } from "../models/url.model.js";

async function generateNewShortUrl(req , res) {
    const {url} = req.body
    const shortID = shortid()
   
    // console.log(shortID);
    // console.log(url);

    if(!url){
        res.status(400).json({error: "Url is required"})
    }

    const shortURL = await URL.create({
        shortID: shortID,
        redirectURL: url,
        visitHistory: [],
        createdBy: req.user._id,
    })

    return res.render("home",{
        id: shortID
    })

    // res.status(201).json({
    //     shortURL,
    //     id: shortID
    // })
}


const HealthCheck = async (req,res) => {
    res.status(200).json({message: "Everything is fine"});
}

const getClickAnalytics = async (req,res) => {
    const shortID = req.params.shortID;
    // console.log(shortID)

    const result = await URL.findOne({shortID});

    res.status(200).json(
        {
            totalCLicks: result.visitHistory.length,
            analytics: result.visitHistory
        }
    )

}



export{
    generateNewShortUrl,
    HealthCheck,
    getClickAnalytics
}