const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } = require('graphql');
const { GraphQLUpload } = require('graphql-upload');  // for file upload scalar type
const resolvers = require('./resolvers'); // Assuming your resolvers are in this file

// User Upload Queries
const UploadQuery = new GraphQLObjectType({
    name: 'UploadQuery',
    fields: {
        getUserFiles: {
            type: new GraphQLList(GraphQLString),  // You can return the list of file names or paths
            args: { userId: { type: GraphQLID } },
            resolve: resolvers.upload.getUserFiles // Assume resolvers.upload.getUserFiles exists
        }
    }
});

// User File Upload Mutations
const UploadMutation = new GraphQLObjectType({
    name: 'UploadMutation',
    fields: {
        uploadUserFile: {
            type: GraphQLString,
            args: {
                file: { type: new GraphQLNonNull(GraphQLUpload) },
            },
            resolve: resolvers.upload.uploadUserFile // Assume resolvers.upload.uploadUserFile exists
        },
        uploadUserResume: {
            type: GraphQLString,
            args: {
                file: { type: new GraphQLNonNull(GraphQLUpload) },
            },
            resolve: resolvers.upload.uploadUserResume // Assume resolvers.upload.uploadUserResume exists
        },
        uploadUserCoverLetter: {
            type: GraphQLString,
            args: {
                file: { type: new GraphQLNonNull(GraphQLUpload) },
            },
            resolve: resolvers.upload.uploadUserCoverLetter // Assume resolvers.upload.uploadUserCoverLetter exists
        }
    }
});

// Company File Upload Queries
const CompanyUploadQuery = new GraphQLObjectType({
    name: 'CompanyUploadQuery',
    fields: {
        getCompanyFiles: {
            type: new GraphQLList(GraphQLString),  // You can return the list of company file names or paths
            args: { companyId: { type: GraphQLID } },
            resolve: resolvers.upload.getCompanyFiles // Assume resolvers.upload.getCompanyFiles exists
        }
    }
});

// Company File Upload Mutations
const CompanyUploadMutation = new GraphQLObjectType({
    name: 'CompanyUploadMutation',
    fields: {
        uploadCompanyFile: {
            type: GraphQLString,
            args: {
                file: { type: new GraphQLNonNull(GraphQLUpload) },
            },
            resolve: resolvers.upload.uploadCompanyFile // Assume resolvers.upload.uploadCompanyFile exists
        }
    }
});

module.exports = {UploadQuery, UploadMutation};
