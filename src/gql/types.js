const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLFloat, GraphQLNonNull } = require("graphql");

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        type: { type: GraphQLString },
    }
});

const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: {
        _id: { type: GraphQLID },
        userId: { type: GraphQLID },
        bio: { type: GraphQLString },
        skills: { type: new GraphQLList(GraphQLString) },
        experience: { type: new GraphQLList(GraphQLString) },
        resumes: { type: new GraphQLList(GraphQLString)},
        profile_photo : { type: GraphQLString}
    }
});

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        website: { type: GraphQLString },
        industry: { type: GraphQLString },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        country: { type: GraphQLString },
        description: { type: GraphQLString },
        business_registry_id: { type: GraphQLString },
        CRA_BN: { type: GraphQLString },
        managers: { type: new GraphQLList(GraphQLID) },
        recruiters: { type: new GraphQLList(GraphQLID) },
    }
})

const ListingType = new GraphQLObjectType({
    name: 'Listing',
    fields: {
        _id: { type: GraphQLID} ,
        title: { type: GraphQLID },
        description: { type: GraphQLString },
        qualifications: { type: GraphQLString },
        work_type: { type: GraphQLString },
        pay_type: { type: GraphQLString },
        pay_amt: { type: GraphQLInt },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        address: { type: GraphQLString },
        tags: { type: GraphQLString },
        prompts: { type: GraphQLString },
        available: { type: GraphQLString },
        date_posted: { type: GraphQLString },
        company: { type: GraphQLID },
        recruiters: { type: new GraphQLList(GraphQLID) },
    }
})

const ApplicationType = new GraphQLObjectType({
    name: 'Application',
    fields: {
        _id: { type: GraphQLID} ,
        resume_url: { type: GraphQLID },
        status: { type: GraphQLString },
        date_created: { type: GraphQLString },
        prompt_answers: { type: new  GraphQLList(GraphQLString)},
        listing: { type: GraphQLID },
        applicant: { type: GraphQLID },
    }

});

const ReviewType = new GraphQLObjectType({
    name: "Review",
    fields: () => ({
        _id: { type: GraphQLID },
        userId: { type: GraphQLID },
        company: { type: GraphQLID },
        position: {
            type: new GraphQLObjectType({
                name: "Position",
                fields: {
                    title: { type: GraphQLString },
                    startDate: { type: GraphQLString },
                    endDate: { type: GraphQLString }
                }
            })
        },
        ratings: {
            type: new GraphQLObjectType({
                name: "Ratings",
                fields: {
                    managementQuality: { type: GraphQLFloat },
                    workplaceCulture: { type: GraphQLFloat },
                    growthPotential: { type: GraphQLFloat }
                }
            })
        },
        pros: { type: new GraphQLList(GraphQLString) },
        cons: { type: new GraphQLList(GraphQLString) },
        additionalComments: { type: GraphQLString }
    })
});

const MessageType = new GraphQLObjectType({
    name: "Message",
    fields: {
        id: { type: GraphQLID },
        listing: { type: new GraphQLNonNull(GraphQLID) },
        applicant: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    }
});

// Conversation Type
const ConversationType = new GraphQLObjectType({
    name: "Conversation",
    fields: {
        listing: { type: new GraphQLNonNull(GraphQLID) },
        applicant: { type: new GraphQLNonNull(GraphQLID) },
        messages: { type: new GraphQLList(MessageType) }
    }
});
module.exports = {
    UserType,
    ProfileType,
    CompanyType,
    ListingType,
    ApplicationType
}