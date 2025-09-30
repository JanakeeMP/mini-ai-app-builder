import mongoose from 'mongoose';

const RequirementSchema = new mongoose.Schema({
    appDescription: String,
    appName: String,
    entities: [{
        name: { type: String, required: true },
        fields: [
            {
                name: { type: String },
                type: { type: String, default: "string" }
            }
        ]
    }],
    roles: [String],
    features: [String],
    roleFeatures: { type: Map, of: [String] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
},
    { timestamps: true });

export default mongoose.model("Requirement", RequirementSchema);