var fs = require("fs");
var path = require('path');
import {TutorialAdapter as tutorials} from './tutorials';

export class ChapterAdapter {
  static index(tutorialId){
    console.log('tutorial id: ', tutorialId)
    let tut = tutorials.show({id: tutorialId});
    console.log('tut: ', tut)
    let chapters = require(`./tutorials/${tut.file_name}/chapters/index.js`);
    return chapters(this.get) || {};
  }

  static get(filePath) {
    // filePath = path.join(__dirname + `/${filePath}`)
    const data = fs.readFileSync(filePath);
    return data;
  }

  static show({tutorial_id, chapter_order}) {
    let chapters = this.index(tutorial_id);
    if (chapters == {}) {return {}}
    return chapters.filter(chapter => chapter.chapter_order == chapter_order)[0];
  }
}

