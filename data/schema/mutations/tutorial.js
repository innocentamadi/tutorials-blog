import Tutorial from '../types/tutorial';
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

const createTutorialMutation = mutationWithClientMutationId({
  name: 'createTutorial',
  inputFields: {
    title: {type: new GraphQLNonNull(GraphQLString)},
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Time estimated to go through this tutorial in minutes',
    },
    description: {type: new GraphQLNonNull(GraphQLString)},
    featured_image_url: {type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    tutorial: {
      type: Tutorial,
      resolve: ({id, title, description, duration, featured_image_url}) => ({
        id,
        title,
        description,
        duration,
        featured_image_url
      }),
    },
  },
  mutateAndGetPayload: ({title, description, duration, featured_image_url}) => 
    db.one('INSERT INTO tutorials(title, description, duration, featured_image_url)' +
      'values($1, $2, $3, $4) RETURNING *', 
      [title, description, duration, featured_image_url])
});

export default createTutorialMutation;
