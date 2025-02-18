const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const { UserType } = require("../types");
const resolvers = require("../resolvers");

const UserQuery = new GraphQLObjectType({
    name: 'UserQuery',
    fields: {
        login: {
            type: GraphQLString,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: resolvers.user.login
        },
        getById: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: resolvers.user.getById
        },
        getByEmail: {
            type: UserType,
            args: { email: { type: GraphQLString } },
            resolve: resolvers.user.getByEmail
        },
        getAll: {
            type: new GraphQLList(UserType),
            resolve: resolvers.user.getAll
        }
    }
});

const UserMutation = new GraphQLObjectType({
    name: 'UserMutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                phone: { type: GraphQLString },
                type: { type: GraphQLString },
            },
            resolve: resolvers.user.signup
        },
        update: {
            type: UserType,
            args: {
                uid: { type: GraphQLID },
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                phone: { type: GraphQLString },
                type: { type: GraphQLString },
            },
            resolve: resolvers.user.update
        },
        delete: {
            type: GraphQLString,
            args: {
                id: { type: GraphQLID }
            },
            resolve: resolvers.user.delete
        }
    }
});

module.exports = { UserQuery, UserMutation };
