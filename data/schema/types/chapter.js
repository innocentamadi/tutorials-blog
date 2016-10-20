import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import {
  getChildConnectionByName
} from '../helpers/dbHelpers.js';

import {
  CHAPTER_TYPE,
  PAGE_TYPE,
  CHAPTER_TABLE,
  PAGE_TABLE
} from '../../constants';

import Page from './page';

import {getRecordByColumn} from '../helpers/dbHelpers';

const Chapter = new GraphQLObjectType({
  name: CHAPTER_TYPE,
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: {type: GraphQLString},
    duration: {type: GraphQLInt},
    description: {type: GraphQLString},
    featured_image_url: {type: GraphQLString},
    tutorial_id: {type: GraphQLInt},
    chapter_order: {type: GraphQLInt},
    page: {
      type: Page,
      args: {
        page_order: {type: GraphQLInt},
      },
      resolve: (chapter, {page_order}) => 
        getRecordByColumn(PAGE_TABLE, {
          tutorial_id: chapter.tutorial_id,
          chapter_order: chapter.chapter_order,
          page_order, 
        })
    },
    pagesConnection: getChildConnectionByName({
      typeName: 'ChapterPages',
      tableType: PAGE_TYPE,
      tableName: 'pages',
      foreignKey: 'chapter_order'
    })
  })
})

export default Chapter;
