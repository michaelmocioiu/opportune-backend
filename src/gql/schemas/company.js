const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const { CompanyType } = require("../types");
const resolvers = require("../resolvers");

// Company Queries
const CompanyQuery = new GraphQLObjectType({
    name: 'CompanyQuery',
    fields: {
        getById: {
            type: CompanyType,
            args: { companyId: { type: GraphQLID } },
            resolve: resolvers.company.getById
        },
        getAll: {
            type: CompanyType,
            resolve: resolvers.company.getAll
        }
    }
});

// Company Mutations
const CompanyMutation = new GraphQLObjectType({
    name: 'CompanyMutation',
    fields: {
        create: {
            type: CompanyType,
            args: {
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
            },
            resolve: resolvers.company.create
        },
        update: {
            type: CompanyType,
            args: {
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
            },
            resolve: resolvers.company.update
        }
    }
});

module.exports = { CompanyQuery, CompanyMutation };