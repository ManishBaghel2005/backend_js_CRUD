import express from 'express';
import { 
    getHomeController ,
    getSingleContactController,
    getAddContactPage,
    createContactController,
    getUpdateContactPage, 
    updateContactController, 
    deleteContactController
} from '../controller/contacts.controllers.js';

const router = express.Router();
router.get('/', getHomeController);
router.get('/show-contact/:id', getSingleContactController);
router.get('/add-contact', getAddContactPage);
router.post('/add-contact', createContactController);
router.get('/update-contact/:id', getUpdateContactPage);
router.post('/update-contact/:id', updateContactController);
router.get('/delte-contact/:id', deleteContactController);
export default router;