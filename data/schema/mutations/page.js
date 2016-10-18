
import Page from '../types/page';
import {db} from '../../queries';

import {
  mutationWithClientMutationId
} from 'graphql-relay';

import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from 'graphql'

const createPageMutation = mutationWithClientMutationId({
  name: 'createPage',
  inputFields: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    body: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The post to be shown in this page',
    },
    page_order: {type: new GraphQLNonNull(GraphQLInt)},
    chapter_order: {type: new GraphQLNonNull(GraphQLInt)}
  },
  outputFields: {
    page: {
      type: Page,
      resolve: ({id, title, body, page_order, chapter_order}) => ({
        id,
        title,
        body,
        page_order,
        chapter_order
      }),
    },
  },
  mutateAndGetPayload: ({title, description, page_order, chapter_order}) => 
    db.one('INSERT INTO pages(title, body, page_order, chapter_order)' +
      'values($1, $2, $3, $4) RETURNING *',
      [title, description, page_order, chapter_order])
});

export default createPageMutation;
