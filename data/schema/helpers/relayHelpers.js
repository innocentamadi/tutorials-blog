import AuthorType from '../types/author';
import TutorialType from '../types/tutorial';
import ChapterType from '../types/chapter';
import PageType from '../types/page';

import {
  AUTHOR,
  TUTORIAL,
  CHAPTER,
  PAGE
} from '../../constants';

const tableTypeToGraphQLType = (tableType) => {
  switch (tableType) {
    case AUTHOR:
      return AuthorType;
    case TUTORIAL:
      return TutorialType;
    case CHAPTER:
      return ChapterType;
    case PAGE:
      return PageType;
  }
};

export {tableTypeToGraphQLType};
