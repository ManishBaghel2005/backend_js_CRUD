
import user from "../modles/contacts.models.js";
import mongoose from "mongoose";

export const getHomeController = async(req, res)=>{
    try {
        // const contacts = await user.find();
        const {page=1, limit=3} = req.query
        const options={
            page: parseInt(page),
            limit: parseInt(limit)
        }
        const result = await user.paginate({}, options)
        // res.send(result)
        res.render('home',{
            totalDocs: result.totalDocs,
            limit: result.limit,
            totalPages: result.totalPages,
            page: result.page,
            Counter: result.pagingCounter,
            currentPage: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            contacts: result.docs
        })
    } catch (error) {
        res.render('500',{message: error})
    }
}

export const getSingleContactController = async(req, res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.render('404', {message: "Invalid Id"})
    }
    try {
        const singlecontact = await user.findOne({_id:req.params.id});
        if(!singlecontact){
            res.render('404', {message: "Contact Not Found"})
        }
        res.render('show-contact',{singlecontact})
    } catch (error) {
        res.render('500', {message: error})
    }
}

export const getAddContactPage = (req, res)=>{
    try {
        res.render('add-contact', { errorMessage: null });
    } catch (error) {
        res.render('500',{message:error})
    }
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
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.render('404', {message: "Invalid Id"})
    }

    try {
        const singlecontact = await user.findOne({ _id: req.params.id });
         if(!singlecontact){
            res.render('404', {message: "Contact Not Found"})
        }
        res.render('update-contact', { singlecontact });
    } catch (error) {
        res.render('500', {message: error})
    }
};


export const updateContactController = async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.render('404', {message: "Invalid Id"})
    }
      try {
        const contact= await user.findByIdAndUpdate(req.params.id, req.body);
         if(!contact){
            res.render('404', {message: "Contact Not Found"})
        }
        res.redirect('/');
    } catch (error) {
        res.render('500', {message: error})
    }
   
    
};


export const deleteContactController = async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.render('404', {message: "Invalid Id"})
    }
    try {
         const contact = await user.findByIdAndDelete(req.params.id);
         if(!contact){
            res.render('404', {message: "Contact Not Found"})
        }
        res.redirect('/');
    } catch (error) {
        res.render('500', {message: error})
    }
};

