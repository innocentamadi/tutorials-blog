export class AuthorAdapter {
  static index() {
    return require('./authors/index') || {};
  }

  static show({author_id}) {
    let authors = this.index();
    if (authors == {}) {return {}}
    return authors.filter(author => author.author_id == author_id)[0];
  }
}

