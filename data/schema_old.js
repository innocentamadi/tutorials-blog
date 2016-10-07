import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
  connectionFromPromisedArray, 
  globalIdField,
  mutationWithClientMutationId
} from "graphql-relay"

import {authors} from './data/authors';
import {tutorials} from './data/tutorials';
import {chapters} from './data/chapters';
import {pages} from './data/pages';

const Schema = (db) => {
  let store = {};

  let storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      id: globalIdField('Store'),
      authorConnection: {
        type: authorConnection.connectionType,
        args: connectionArgs, 
        resolve: (_, args) => {
         return connectionFromPromisedArray(
            db.any('SELECT * FROM authors')
                  .then(authors => authors),
            args
          )
        }
      }
    })
  });

  let authorConnection = connectionDefinitions({
    name: 'Author',
    nodeType: Author
  });

  let createAuthorMutation = mutationWithClientMutationId({
    name: 'CreateAuthor',
    inputFields: {
      title: {type: new GraphQLNonNull(GraphQLString)},
      url: {type: new GraphQLNonNull(GraphQLString)}
    },

    outputFields: {
      author: {
        type: Author,
        resolve: (obj) => obj.ops[0]
      }
    },

    mutateAndGetPayload: ({title, url}) => {
      return db.collection("authors").insertOne({title, url});
    }

  })

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        store: {
          type: storeType,
          resolve: () => store
        }
      })
    }),

    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
        createAuthor: createAuthorMutation
      })
    })

  });

  return schema;
};


export default Schema;
