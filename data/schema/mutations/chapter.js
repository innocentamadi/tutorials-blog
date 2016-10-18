
import Chapter from '../types/chapter';
import {db} from '../../queries';

import {
  mutationWithClientMutationId
} from 'graphql-relay';

import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from 'graphql'

const createChapterMutation = mutationWithClientMutationId({
  name: 'createChapter',
  inputFields: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Time estimated to go through this chapter in minutes',
    },
    description: {type: new GraphQLNonNull(GraphQLString)},
    tutorial_id: {type: new GraphQLNonNull(GraphQLID)},
    chapter_order: {type: new GraphQLNonNull(GraphQLInt)},
    featured_image_url: {type: GraphQLString}
  },
  outputFields: {
    chapter: {
      type: Chapter,
      resolve: ({id, title, description, duration, 
        tutorial_id, chapter_order, featured_image_url}) => ({
        id,
        title,
        description,
        duration,
        tutorial_id,
        chapter_order,
        featured_image_url
      }),
    },
  },
  mutateAndGetPayload: ({title, description, duration, 
    tutorial_id, chapter_order, featured_image_url}) => 
    db.one('INSERT INTO chapters(title, description, duration,' +
            'tutorial_id, chapter_order, featured_image_url)' +
            'values($1, $2, $3, $4, $5, $6) RETURNING *', 
            [title, description, duration, tutorial_id,
              chapter_order, featured_image_url])
});

export default createChapterMutation;
