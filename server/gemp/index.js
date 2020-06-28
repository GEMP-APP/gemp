const users = [];

class Gemp {
  static userJoin(payload) {
    const { id, room, username } = payload;
    const user = { id, room, username };
  
    users.push(user);
    return user;
  }
  
  static getCurrentUser(id) {
    return users.find((user) => user.id === id);
  }

  static formatMessage(username = "", message, type) {
    return {
      username,
      message,
      type
    }
  }

  static userLeave(id) {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
      return users.splice(index, 1)[0]
    }
  }

  static getUsersInRoom(room) {
    return users.filter(user => user.room === room)
  }
}


module.exports = Gemp
