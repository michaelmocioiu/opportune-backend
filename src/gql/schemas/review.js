const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = require("graphql");
const { ReviewType } = require("../types");
const resolvers = require("../resolvers");

const ReviewQuery = new GraphQLObjectType({
    name: "ReviewQuery",
    fields: {
        getByCompanyId: {
            type: new GraphQLList(ReviewType),
            args: { companyId: { type: GraphQLID } },
            resolve: resolvers.review.getByCompanyId
        },
        getByUserId: {
            type: new GraphQLList(ReviewType),
            args: { userId: { type: GraphQLID } },
            resolve: resolvers.review.getByCompanyId
        },
        getById: {
            type: ReviewType,
            args: { _id: { type: GraphQLID } },
            resolve: resolvers.review.getById
        },
        getAll: {
            type: new GraphQLList(ReviewType),
            resolve: resolvers.review.getAll
        }
    }
});

// Review Mutations
const ReviewMutation = new GraphQLObjectType({
    name: "ReviewMutation",
    fields: {
        create: {
            type: ReviewType,
            args: {
                company: { type: new GraphQLNonNull(GraphQLID) },
                position: {
                    type: new GraphQLNonNull(new GraphQLObjectType({
                        name: "PositionInput",
                        fields: {
                            title: { type: GraphQLString },
                            startDate: { type: GraphQLString },
                            endDate: { type: GraphQLString }
                        }
                    }))
                },
                ratings: {
                    type: new GraphQLNonNull(new GraphQLObjectType({
                        name: "RatingsInput",
                        fields: {
                            managementQuality: { type: GraphQLFloat },
                            workplaceCulture: { type: GraphQLFloat },
                            growthPotential: { type: GraphQLFloat }
                        }
                    }))
                },
                pros: { type: new GraphQLList(GraphQLString) },
                cons: { type: new GraphQLList(GraphQLString) },
                additionalComments: { type: GraphQLString }
            },
            resolve: resolvers.review.create
        },
        update: {
            type: ReviewType,
            args: {
                _id: { type: GraphQLID },
                company: { type: GraphQLID },
                position: {
                    type: new GraphQLObjectType({
                        name: "PositionUpdateInput",
                        fields: {
                            title: { type: GraphQLString },
                            startDate: { type: GraphQLString },
                            endDate: { type: GraphQLString }
                        }
                    })
                },
                ratings: {
                    type: new GraphQLObjectType({
                        name: "RatingsUpdateInput",
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
            },
            resolve: resolvers.review.update
        },
        delete: {
            type: GraphQLString,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve: resolvers.review.delete
        }
    }
});

module.exports = { ReviewQuery, ReviewMutation };