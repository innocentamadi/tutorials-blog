import {tableTypeToGraphQLType} from './relayHelpers';

import {db} from '../../queries';

import {TutorialAdapter as tutorials} from '../../../posts/tutorials';
import {ChapterAdapter as chapters} from '../../../posts/chapters';
import {PageAdapter as pages} from '../../../posts/pages';
import {AuthorAdapter as authors} from '../../../posts/authors';
import {UserAdapter as users} from '../../../posts/users';
// import {tutorials} from '../../data/tutorials';

// console.log(tutorials)
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

import {
  AUTHOR_TABLE,
  TUTORIAL_TABLE,
  CHAPTER_TABLE,
  PAGE_TABLE,
  USER_TABLE
} from '../../constants';

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

export const getRecordByColumn = (tableName, conditions) => {
  // return db
  //   .one(`select * from ${tablename} ${condition(conditions)}`, objToArray(conditions))
  //   .then(result => result )
  //   .catch(err => console.log(err));
  switch(tableName) {
    case TUTORIAL_TABLE:
      return tutorials.show(conditions);
    case CHAPTER_TABLE:
      return chapters.show(conditions);
    case PAGE_TABLE:
      return pages.show({...conditions});
    case AUTHOR_TABLE:
      return authors.show({...conditions});
    case USER_TABLE:
      return users.show({...conditions});
  }
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
//
// const getChildTableRecords = ({
//   tableName,
//   foreignKey,
//   parent
// }) => db
//   .any(`SELECT * FROM ${tableName} WHERE ${foreignKey} = $1`,
//     parent.id).then(result => result);

const getChildTableRecords = ({
  tableName,
  foreignKey,
  parent
}) => {
  switch(tableName) {
    case TUTORIAL_TABLE:
      return tutorials.show(foreignKey);
    case CHAPTER_TABLE:
      return chapters.index(parent.id);
    case PAGE_TABLE:
      return pages.index({...parent});
    case AUTHOR_TABLE:
      return authors.index();
    case USER_TABLE:
      return users.index();
  }
}
const fieldType = field => field == 'id' ? 
  new GraphQLNonNull(GraphQLID) : GraphQLInt;

const getFieldByColumn = (tableType, tableName, column='id') => ({
  type: tableTypeToGraphQLType(tableType),
  args: {
    [column]: {type: fieldType(column)}
  },
  // resolve: (_, args) => getRecordByColumn(tableName, {[column]: args[column]})
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
      // return connectionFromPromisedArray(
      //   getTableRecords(tableName),
      //   args
      // );
      //   console.log(tutorials.index())
      let adapter;
      switch (tableName) {
        case TUTORIAL_TABLE:
          adapter = tutorials;
          break;
        case CHAPTER_TABLE:
          adapter = chapters;
          break;
        case PAGE_TABLE:
          adapter = pages;
          break;
        case AUTHOR_TABLE:
          adapter = authors;
          break
      }
      return connectionFromArray(
        adapter.index(),
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
      return connectionFromArray(
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
