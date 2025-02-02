const profileSchema = new mongoose.Schema({
    email: { type: String, required: true },
    bio: { type: String },
    skills: {  type: [String] },
    experience: { type: [String] }, 
    profile: { type: mongoose.Schema.Types.ObjectId, ref: ''},
}, { timestamps: true });