class UserRepository {
  constructor(UserModel, UserBookModel) {
    this.User = UserModel;
    this.UserBookHistory = UserBookModel;
  }
  // ● Listing users
  // ● Accessing information about a user (name, books borrowed in the past with their user
  // scores, and currently borrowed books)
  // ● Creating a new user
  // ● Listing books
  // ● Accessing information about a book (name and average rating). Book viewing should be
  // considered as a process much more frequent than borrowing and returning.
  // ● Creating a new book
  // ● Borrowing a book
  // ● Returning a book and giving a rating
  async findAllUsers() {
    return await this.User.findAll();
  }

  async findUserById(userId) {
    return await this.User.findByPk(userId, {
      include: [
        {
          model: this.UserBookHistory,
          as: "userBookHistory",
        },
      ],
    });
  }

  async createUser(userData) {
    return await this.User.create(userData);
  }
}

module.exports = UserRepository;
