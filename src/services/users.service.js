class UserService {
  constructor(
    bookService,
    userRepository,
    userBookHistoryRepository,
    redisClient
  ) {
    this.bookService = bookService;
    this.userRepository = userRepository;
    this.userBookHistoryRepository = userBookHistoryRepository;
    this.redisClient = redisClient;
  }

  async saveToRedis(userId, data) {
    return this.redisClient.set(`users:${userId}`, data);
  }

  async getFromRedis(userId) {
    return this.redisClient.get(`users:${userId}`);
  }

  async getAllUsers() {
    return await this.userRepository.findAllUsers();
  }

  async getUserById(userId) {
    let user = await this.getFromRedis(userId);
    if (user) {
      return user;
    }
    user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new Error("User does not exist");
    }
    await this.saveToRedis(userId, user);
    return user;
  }

  async borrowBook(userId, bookId) {
    const book = await this.bookService.getBookById(bookId);

    if (book.isCurrentlyBorrowed) {
      throw new Error("Book already borrowed");
    }
    await this.getUserById(userId);
    await this.userBookHistoryRepository.borrowBook({ userId, bookId });

    await this.bookService.borrowBook(book);
    await this.redisClient.delete(`users:${userId}`);
    return {
      success: true,
    };
  }

  async returnBook(userId, bookId, score) {
    const book = await this.bookService.getBookById(bookId);
    if (!book.isCurrentlyBorrowed) {
      throw new Error("Book not borrowed yet");
    }
    await this.getUserById(userId);

    await this.bookService.returnBook(book);
    await this.userBookHistoryRepository.returnBook(userId, bookId, score);
    await this.redisClient.delete(`users:${userId}`);
    await this.redisClient.delete(`books:${userId}`);
    return {
      success: true,
    };
  }

  async createUser(userData) {
    const user = await this.userRepository.createUser(userData);
    await this.saveToRedis(user.id, user);
    return user;
  }
}

module.exports = UserService;
