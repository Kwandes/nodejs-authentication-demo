let users = [
  {
    userId: 1,
    email: "admin@example.com",
    password: "mockPass",
  },
  {
    userId: 2,
    email: "user@example.com",
    password: "mockPass",
  },
];

export class UsersService {
  async findAll() {
    return users;
  }

  async findOne(id) {
    const user = users.find((user) => user.userId == id);
    if (!user) {
      const error = new Error(`User with id '${id}' was not found`);
      error.code = 404;
      throw error;
    }
    return user;
  }

  async findOneByEmail(email) {
    const user = users.find((user) => user.email === email);
    if (!user) {
      const error = new Error(`User with email '${email}' was not found`);
      error.code = 404;
      throw error;
    }
    return user;
  }

  async create(email, password) {
    // Check if user exists. If it does then a 400 Bad Reuqest is thrown, otherwise a new user is created
    try {
      await this.findOneByEmail(email);

      // error is thrown by findOne() if the user doesn't exist
    } catch (error) {
      const newUser = {
        userId: users.length + 1,
        email: email,
        password: password,
      };
      users.push(newUser);
      return newUser;
    }
    // User did exist so no error was thrown and the catch() didn't trigger
    const error = new Error(`User with email '${email}' already exists`);
    error.code = 400;
    throw error;
  }

  async perish(id) {
    await this.findOne(id); // check if user exists. Will throw error if doesn't
    users = users.filter((user) => user.userId != id);
  }
}
