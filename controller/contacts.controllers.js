
import user from "../modles/contacts.models.js";

export const getHomeController = async(req, res)=>{
    const contacts = await user.find();
    res.render('home',{contacts})
}

export const getSingleContactController = async(req, res)=>{
    const singlecontact = await user.findOne({_id:req.params.id});
    res.render('show-contact',{singlecontact})
}

export const getAddContactPage = (req, res)=>{
    res.render('add-contact', { errorMessage: null });
}

export const createContactController = async (req, res)=>{
    try {
        console.log("form se aaya data", req.body);
        await user.create(req.body)
        res.redirect('/');
        
    } catch (error) {
        console.error("Database save error", error.message);
       let customError = "Kuch galat hua, kripya check karein.";
        
        if (error.code === 11000) {
            customError = "Yeh Email pehle se register hai!";
        } else if (error.errors) {
            
            customError = Object.values(error.errors).map(err => err.message).join(', ');
        }

        
        res.render('add-contact', { errorMessage: customError });
    }
}


export const getUpdateContactPage = async (req, res) => {
    const singlecontact = await user.findOne({ _id: req.params.id });
    res.render('update-contact', { singlecontact });
};


export const updateContactController = async (req, res) => {
    await user.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
};


export const deleteContactController = async (req, res) => {
    await user.findByIdAndDelete(req.params.id);
    res.redirect('/');
};

