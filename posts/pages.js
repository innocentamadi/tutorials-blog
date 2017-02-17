var fs = require("fs");
var path = require('path');
import {TutorialAdapter as tutorials} from './tutorials/index';
import {ChapterAdapter as chapters} from './chapters';

export class PageAdapter {
  static index({tutorial_id, chapter_order}){
    let tut = tutorials.show({id: tutorial_id});
    let chap = chapters.show({tutorial_id, chapter_order});
    let pages = require(`./tutorials/${tut.file_name}/chapters/${chap.file_name}/pages/index.js`);
    return pages(this.get) || {};
  }

  static get(filePath) {
    // filePath = path.join(__dirname + `/${filePath}`)
    const data = fs.readFileSync(filePath);
    return data;
  }

  static show({tutorial_id, chapter_order, page_order}) {
    let pages = this.index({tutorial_id, chapter_order});
    if (pages == {}) {return {}}
    return pages.filter(page => page.page_order == page_order)[0];
  }
}

