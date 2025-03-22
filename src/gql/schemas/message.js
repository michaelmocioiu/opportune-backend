const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");
const resolvers = require("../resolvers");

const MessageQuery = new GraphQLObjectType({
    name: "MessageQuery",
    fields: {
        getMessages: {
            type: ConversationType,
            args: {
                listingId: { type: new GraphQLNonNull(GraphQLID) },
                applicantId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: resolvers.message.getAll
        }
    }
});

const MessageMutation = new GraphQLObjectType({
    name: "MessageMutation",
    fields: {
        sendMessage: {
            type: MessageType,
            args: {
                listingId: { type: new GraphQLNonNull(GraphQLID) },
                applicantId: { type: new GraphQLNonNull(GraphQLID) },
                content: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: resolvers.message.send
        }
    }
});

module.exports = { MessageQuery, MessageMutation };
