
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
    chapter_order: {type: new GraphQLNonNull(GraphQLInt)},
    tutorial_id: {type: new GraphQLNonNull(GraphQLInt)}
  },
  outputFields: {
    page: {
      type: Page,
      resolve: ({id, title, body, page_order, chapter_order, tutorial_id}) => ({
        id,
        title,
        body,
        page_order,
        chapter_order,
        tutorial_id
      }),
    },
  },
  mutateAndGetPayload: ({title, body, page_order, chapter_order, tutorial_id}) => 
    db.one('INSERT INTO pages(title, body, page_order, chapter_order, tutorial_id)' +
      'values($1, $2, $3, $4, $5) RETURNING *',
      [title, body, page_order, chapter_order, tutorial_id])
});

export default createPageMutation;
