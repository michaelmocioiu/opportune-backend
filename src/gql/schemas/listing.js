const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt, GraphQLNonNull } = require("graphql");
const { ListingType } = require("../types");
const resolvers = require("../resolvers");

// Listing Queries
const ListingQuery = new GraphQLObjectType({
    name: 'ListingQuery',
    fields: {
        getById: {
            type: ListingType,
            args: { ListingId: { type: GraphQLID } },
            resolve: resolvers.listing.getById
        },
        getAll: {
            type: new GraphQLList(ListingType),
            resolve: resolvers.listing.getAll
        }
    }
});

// Listing Mutations
const ListingMutation = new GraphQLObjectType({
    name: 'ListingMutation',
    fields: {
        create: {
            type: ListingType,
            args: {
                title: { type: GraphQLString },
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
                company: { type: GraphQLID },
                recruiters: { type: new GraphQLList(GraphQLID) },
            },
            resolve: resolvers.listing.create
        },
        update: {
            type: ListingType,
            args: {
                id: { type: GraphQLID },
                title: { type: GraphQLString },
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
                available: { type: GraphQLString }
            },
            resolve: resolvers.listing.update
        },
        delete: {
            type: GraphQLString,
            args: {
                id: { type: GraphQLID }
            },
            resolve: resolvers.listing.delete
        }
    }
});

module.exports = { ListingQuery, ListingMutation };
