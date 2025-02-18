const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");
const Profile = require("../../model/Profile")

const userResolvers = {
    login: async (parent, args) => {
        const { email, password } = args;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("User not found!");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Incorrect password!");
        }

        const token = jwt.sign({ userId: user.id }, "secret", {
            expiresIn: "1h",
        });

        return token;
    },
    signup: async (parent, args) => {
        const { first_name, last_name, email, password, phone, type } = args;
        console.log("Received data:", { first_name, last_name, email, password, phone, type });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists!");
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ first_name, last_name, email, password: hashedPassword, phone, type });

        const savedUser = await user.save();

        console.log("User created:", user);
        const newProfile = new Profile({
            userId: savedUser._id, 
            bio: "", 
            skills:[], 
            experience: [], 
            resumes: [], 
            profile_photo: ""
        });

        // Save the profile
        await newProfile.save();

        return { _id: user.id, first_name, last_name, email, phone, type };

    },
    getAll: async () => {
        return await User.find();
    },
    getById: async (parent, args) => {
        const user = await User.findById(args.id);
        if (!user) {
            throw new Error("User not found!");
        }
        return user;
    },
    getByEmail: async (parent, args) => {
        const user = await User.findOne({email: args.email});
        if (!user) {
            throw new Error("User not found!");
        }
        return user;
    },
    delete: async (parent, args) => {
        const result = await User.findByIdAndDelete(args.id);
        if (!result) {
            throw new Error("User not found!");
        }
        const p_result = await Profile.findOneAndDelete({userId: args.id})
        if (!p_result) {
            throw new Error("User not found!");
        }
        return "User and profile deleted successfully!";
    }
};

module.exports = userResolvers;
