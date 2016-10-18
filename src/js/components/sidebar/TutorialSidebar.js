import React from 'react';
import {Link} from 'react-router';
import isEmpty from '../../utils/isEmpty.js';

const PageSidebar = ({page, chapter}) =>
  <ul className="pages">
    <li>
      <Link
        to={`/tutorials/${chapter.tutorial_id}/chapters/${chapter.chapter_order}/pages/${page.page_order}`}
        activeClassName="active">
        {page.title}
      </Link>
    </li>
  </ul>

const ChapterSidebar = ({chapter}) => 
  <ul className="chapters">
    <li>
      <Link 
        to={`/tutorials/${chapter.tutorial_id}/chapters/${chapter.chapter_order}`}
        activeClassName="active">
        {chapter.title}
      </Link>
      {chapter.pagesConnection.pages && chapter.pagesConnection.pages.map(page =>
        <PageSidebar {...{page, chapter}} />)}
    </li>
  </ul>

const TutorialSidebar = ({tutorialId, tutorial}) =>
  <ul className="sidebar-elements">
    <li className="divider">Content</li>
    <li className="tutorial">
      <Link to={`/tutorials/${tutorial.id}`} activeClassName="active">
        {tutorial.title}
      </Link>
      {!isEmpty(tutorial.chaptersConnection) && 
      tutorial.chaptersConnection.chapters.map(chapter =>
        <ChapterSidebar {...{chapter}} />)}
    </li>
  </ul>
export default TutorialSidebar;
