import AuthorType from '../types/author';
import TutorialType from '../types/tutorial';
import ChapterType from '../types/chapter';
import PageType from '../types/page';

import {
  AUTHOR_TYPE,
  TUTORIAL_TYPE,
  CHAPTER_TYPE,
  PAGE_TYPE
} from '../../constants';

const tableTypeToGraphQLType = (tableType) => {
  switch (tableType) {
    case AUTHOR_TYPE:
      return AuthorType;
    case TUTORIAL_TYPE:
      return TutorialType;
    case CHAPTER_TYPE:
      return ChapterType;
    case PAGE_TYPE:
      return PageType;
  }
};

export {tableTypeToGraphQLType};
