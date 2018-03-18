import express from 'express';
var cookieParser = require('cookie-parser');
import cors from 'cors';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import { Engine } from 'apollo-engine';
const mongoose = require('./env/mongoose');
const db = mongoose();
import * as Schema from './schema/schema';
const PORT = 3000;
const ENGINE_API_KEY ='service:api-gateaway:7TylA3IJbWg_8cgztnScXQ';
const server = express();
const engine = new Engine({
    engineConfig: {
        apiKey: ENGINE_API_KEY,
        stores: [
            {
                name: 'inMemEmbeddedCache',
                inMemory: {
                    cacheSize: 20971520 // 20 MB
                }
            }
        ],
        queryCache: {
            publicFullQueryStore: 'inMemEmbeddedCache'
        }
    },
    graphqlPort: PORT,
    endpoint: '/graphql-api/graphql',
    dumpTraffic: true
});

engine.start();
// This must be the first middleware
server.use(cookieParser());
server.use(engine.expressMiddleware());
server.use(compression());
server.use(cors());
server.options('*', cors());
const schemaFunction =
    Schema.schemaFunction ||
    function () {
        return Schema.schema;
    };
let schema;
const rootFunction =
    Schema.rootFunction ||
    function () {
        return schema.rootValue;
    };
const contextFunction =

    Schema.context ||
    function (headers, secrets) {

        return Object.assign(
            {
                headers: headers,
            },
            secrets
        );
    };

server.use('/graphql-api/graphql', bodyParser.json(), graphqlExpress(async (request) => {
    if (!schema) {
        schema = schemaFunction(process.env)
    }

    const context = await contextFunction(request.headers, process.env);
    const rootValue = await rootFunction(request.headers, process.env);

    return {
        schema:schema,
        rootValue,
        context,
        tracing: true,
        cacheControl: true
    };
}));

server.use('/graphql-api/graphiql', graphiqlExpress({
    endpointURL: '/graphql-api/graphql',
    query: ``,
}));

server.listen(PORT, () => {
    console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql-api/graphql`);
    console.log(`View GraphiQL at http://localhost:${PORT}/graphql-api/graphiql`);
});