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
// create where string
// make value into an array

export const condition = conditions => {
  let prefix = 'WHERE ';
  let condition = '';
  let columns = Object.keys(conditions)
  for(let i=0; i < columns.length; i++) {
    condition += `${columns[i]} = $${i + 1}`;
    if (i < columns.length - 1) condition += ' AND ';
  }
  return (prefix + condition)
}

export const getRecordBy = (tableName, column, parent) => {
  return db
    .one(`SELECT * FROM ${tableName} WHERE ${column} = $1`, columnValue)
    .then(result => result )
    .catch(err => console.log(err));
};

export const objToArray = obj => {
  let arr = [];
  for (let key in obj) {
    arr.push(obj[key]);
  }
  return arr;
}

export const getRecordByColumn = (tablename, conditions) => {
  return db
    .one(`select * from ${tablename} ${condition(conditions)}`, objToArray(conditions))
    .then(result => result )
    .catch(err => console.log(err));
};

export const getRecordsByColumn = (tablename, conditions) => {
  return db
    .any(`select * from ${tablename} ${condition(conditions)}`, objToArray(conditions))
    .then(result => result )
    .catch(err => console.log(err));
};

const getTableRecords = (tableName) => {
  return db.any(`SELECT * FROM ${tableName}`)
      .then(result => result)
      .catch(err => console.log(err));
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
  resolve: (_, args) => getRecordByColumn(tableName, {[column]: args[column]})
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
