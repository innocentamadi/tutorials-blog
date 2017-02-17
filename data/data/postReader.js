var fs = require("fs");
var path = require('path');


class PostReader {
    static getPost(id) {

        // Asynchronous read
        // console.log('starting async read')
        // fs.readFile('post.txt', function (err, data) {
        //     if (err) {
        //         return console.error(err);
        //     }
        //     console.log("Asynchronous read: " + data.toString());
        //     return data.toString();
        // });
      var filepath = path.join(__dirname + '/post.md')
      console.log(filepath)
      var data = fs.readFileSync(filepath);
      console.log('the data', data);
      return data
    }
};

export default PostReader;