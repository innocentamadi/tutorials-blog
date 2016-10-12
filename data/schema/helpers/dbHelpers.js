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

export const getRecordByColumn = (tableName, columnValue, column='id') => {
  return db
    .one(`SELECT * FROM ${tableName} WHERE ${column} = $1`, columnValue)
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

const fieldType = field => field == 'id' ? 
  new GraphQLNonNull(GraphQLID) : GraphQLInt;

const getFieldByColumn = (tableType, tableName, column='id') => ({
  type: tableTypeToGraphQLType(tableType),
  args: {
    [column]: {type: fieldType(column)}
  },
  resolve: (_, args) => getRecordByColumn(tableName, args[column], column)
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
