const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = require("graphql");

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
        prompt_answers: { type: GraphQLString },
        listing: { type: GraphQLID },
        applicant: { type: GraphQLID },
    }

});


module.exports = {
    UserType,
    ProfileType,
    CompanyType,
    ListingType,
    ApplicationType
}