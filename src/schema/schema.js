// See docs and examples at https://github.com/apollographql/awesome-launchpad
// graphql-tools combines a schema string with resolvers.
import {makeExecutableSchema} from 'graphql-tools';
import resolvers from "../resolvers/resolvers";
import ElasticSearch from "./elasticSearch";


// Construct a schema, using GraphQL schema language
const Schema = `
  type Query {
    getListByAgentID(agentId:String!):AgentResponse
}
 
`;

// Provide resolver functions for your schema fields

// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
    typeDefs: [Schema,  ElasticSearch],
    resolvers: resolvers,

});


export function context(headers, secrets) {
    return {
        headers,
        secrets,
    };
};


