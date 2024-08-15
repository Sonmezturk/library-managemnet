class BookService {
  constructor(bookRepository, redisService) {
    this.bookRepository = bookRepository;
    this.redisClient = redisService;
  }

  async getAllBooks() {
    return await this.bookRepository.findAllBooks();
  }

  async getBookById(bookId) {
    let bookData = await this.getFromRedis(bookId);
    if (bookData) {
      return bookData;
    }
    bookData = await this.bookRepository.findBookById(bookId);
    if (!bookData) {
      throw new Error("Book does not exist");
    }

    const scores = bookData.userBookHistory
      .map((item) => item.score)
      .filter((score) => score !== null);

    const averageScore =
      scores.reduce((sum, score) => sum + score, 0) / scores.length;

    await this.saveToRedis(bookId, {
      ...bookData.dataValues,
      averageScore: averageScore || 0,
    });
    return {
      ...bookData.dataValues,
      averageScore: averageScore || 0,
    };
  }

  async saveToRedis(bookId, data) {
    return this.redisClient.set("books:" + bookId, data);
  }

  async getFromRedis(bookId) {
    return this.redisClient.get(`books:${bookId}`);
  }

  async createBook(bookData) {
    const book = await this.bookRepository.createBook(bookData);
    this.saveToRedis(book.id, book);
    return book;
  }

  async borrowBook(book) {
    const payload = {
      ...book,
      isCurrentlyBorrowed: true,
    };
    await Promise.all([
      this.saveToRedis(book.id, payload),
      this.bookRepository.updateBook(book.id, payload),
    ]);
  }
  async returnBook(book) {
    const payload = {
      ...book,
      isCurrentlyBorrowed: false,
    };
    await Promise.all([
      this.saveToRedis(book.id, payload),
      this.bookRepository.updateBook(book.id, payload),
    ]);
  }
}

module.exports = BookService;
