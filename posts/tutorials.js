var fs = require("fs");
var path = require('path');
import tutorials from './tutorials/index';

export class TutorialAdapter {
  static index() {
    return tutorials(this.get) || {};
  }

  static get(filePath) {
    filePath = path.join(__dirname + `/${filePath}`)
    return fs.readFileSync(filePath);
  }

  static show({id}) {
    return this.index().filter(tutorial => tutorial.id == id)[0];
  }
}

