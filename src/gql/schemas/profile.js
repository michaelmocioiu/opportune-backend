const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const { ProfileType } = require("../types");
const resolvers = require("../resolvers");

// Profile Queries
const ProfileQuery = new GraphQLObjectType({
    name: 'ProfileQuery',
    fields: {
        getByUserId: {
            type: ProfileType,
            args: { userId: { type: GraphQLID } },
            resolve: resolvers.profile.getByUserId
        },
        getAll: {
            type: new GraphQLList(ProfileType),
            resolve: resolvers.profile.getAll
        }
    }
});

// Profile Mutations
const ProfileMutation = new GraphQLObjectType({
    name: 'ProfileMutation',
    fields: {
        update: {
            type: ProfileType,
            args: {
                _id: { type: GraphQLID },
                userId: { type: GraphQLID },
                bio: { type: GraphQLString },
                skills: { type: new GraphQLList(GraphQLString) },
                experience: { type: new GraphQLList(GraphQLString) },
                resumes: { type: new GraphQLList(GraphQLString) },
                profile_photo: { type: GraphQLString }
            },
            resolve: resolvers.profile.update
        }
    }
});

module.exports = { ProfileQuery, ProfileMutation };