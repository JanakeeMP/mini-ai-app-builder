import express from 'express';
import Requirement from '../models/Requirement.js';
import { extractRequirements } from '../services/aiExtractor.js';


const router = express.Router();

//Capture Requirments via AI and Save DB
router.post('/requirements', async (req, res) => {
    const description = req.body.description;
    const userId = req.user?._id || null;

    if(!description){
        return res.status(400).json({ error: 'Description is mendatory' });
    }

    try {
        const extractedInfo = await extractRequirements(description);
        const newReq = await Requirement.create ({
            appDescription: description,
            appName: extractedInfo.appName,
            entities: extractedInfo.entities?.map(e => ({
                name: e.name,
                fields: e.fields?.map(f => ({
                  name: f.name,
                  type: f.type || "string"
                }))
            })),
            roles: extractedInfo.roles,
            features: extractedInfo.features,
            roleFeatures: extractedInfo.roleFeatures,
            createdBy: userId
        });
        const output = { ...extractedInfo, id: newReq._id };

        res.json({ ...extractedInfo, id: newReq._id });       
    } catch (error) {
        res.status(500).json( { error: 'Failed to extract requirement : ' + error.message });
    }
});

// Fetch a stored requirement by ID
router.get('/requirements/:id', async (req, res) => {

});

export default router;
