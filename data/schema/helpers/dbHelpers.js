import {tableTypeToGraphQLType} from './relayHelpers';

import {db} from '../../queries';

import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
  connectionFromPromisedArray, 
  globalIdField,
  mutationWithClientMutationId
} from 'graphql-relay';

const getRecordByColumn = (tableName, columnValue) => {
  return db.one(`SELECT * FROM ${tableName} WHERE id = $1`, columnValue)
    .then(result => result);
};

const getTableRecords = (tableName) => {
  return db.any(`SELECT * FROM ${tableName}`)
      .then(result => result);
};

const getChildTableRecords = ({
  tableName,
  foreignKey,
  parent
}) => db
  .any(`SELECT * FROM ${tableName} WHERE ${foreignKey} = $1`, 
    parent.id).then(result => result);

const getFieldByColumn = (tableType, tableName) => ({
  type: tableTypeToGraphQLType(tableType),
  args: {
    id: {type: new GraphQLNonNull(GraphQLID)}
  },
  resolve: (_, args) => getRecordByColumn(tableName, args.id)
});

const getRootConnectionByName = (tableType, tableName) => {
  let graphqlType = tableTypeToGraphQLType(tableType);
  let {connectionType} = connectionDefinitions({
    name: tableType,
    nodeType: graphqlType,
    connectionFields: () => ({
      totalCount: {
        type: GraphQLInt,
        resolve: (conn) => conn.edges.count
      },
      [tableName]: {
        type: new GraphQLList(graphqlType),
        resolve: conn => conn.edges.map(edge => edge.node)
      }
    })
  });
  return {
    type: connectionType,
    args: connectionArgs,
    resolve: (_, args) => {
      return connectionFromPromisedArray(
        getTableRecords(tableName),
        args
      );
    }
  };
};

const getChildConnectionByName = ({
  typeName,
  tableType,
  tableName,
  foreignKey
}) => {
  let graphqlType = tableTypeToGraphQLType(tableType);
  let {connectionType} = connectionDefinitions({
    name: typeName,
    nodeType: graphqlType,
    resolveNode: edge =>  edge.node,
      connectionFields: () => ({
      totalCount: {
        type: GraphQLInt,
        resolve: (conn) => conn.edges.count
      },
      [tableName]: {
        type: new GraphQLList(graphqlType),
        resolve: conn => conn.edges.map(edge => edge.node)
      }
    })
  });
  return {
    type: connectionType,
    args: connectionArgs,
    resolve: (parent, args) => {
      return connectionFromPromisedArray(
        getChildTableRecords({
          tableName, foreignKey, parent
        }),
        args
      );
    }
  };
};


export {
  getFieldByColumn,
  getRootConnectionByName,
  getChildConnectionByName
};
