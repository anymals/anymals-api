import {GraphQLServer} from 'graphql-yoga'
import {GraphQLSchema} from 'graphql'
import {importSchema} from 'graphql-import'
import {createTypeOrmConn} from './utils/createTypeOrmConn';
import {mergeSchemas, makeExecutableSchema} from 'graphql-tools';
import * as path from 'path';
import * as fs from 'fs';


const schemas: GraphQLSchema[] = [];
const folders = fs.readdirSync(path.join(__dirname, "./modules"));
folders.forEach(folder => {
    const {resolvers} = require(`./modules/${folder}/resolvers`);
    const typeDefs = importSchema(path.join(__dirname, `./modules/${folder}/schema.graphql`));
    schemas.push(makeExecutableSchema({resolvers, typeDefs}));
})

const server = new GraphQLServer({schema: mergeSchemas({schemas})});
createTypeOrmConn().then(() => {
    server.start({port: process.env.NODE_ENV === "test" ? 4001 : 4000}).then(() => {
        console.log("Server running ...")
    });
});