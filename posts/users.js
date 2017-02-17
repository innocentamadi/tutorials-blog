export class UserAdapter {
  static index() {
    return require('./authors/users') || {};
  }

  static show({id}) {
    let users = this.index();
    if (users == {}) {return {}}
    return users.filter(user => user.id == id)[0];
  }
}

