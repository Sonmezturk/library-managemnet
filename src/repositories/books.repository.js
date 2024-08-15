class BookRepository {
  constructor(BookModel, UserBookHistoryModel) {
    this.Book = BookModel;
    this.UserBookHistory = UserBookHistoryModel;
  }

  async findAllBooks() {
    return await this.Book.findAll();
  }

  async findBookById(id) {
    return this.Book.findByPk(id, {
      include: [
        {
          model: this.UserBookHistory,
          as: "userBookHistory",
        },
      ],
    });
  }

  async createBook(bookData) {
    return await this.Book.create(bookData);
  }
  async updateBook(id, bookData) {
    return await this.Book.update(bookData, {
      where: {
        id,
      },
    });
  }
}

module.exports = BookRepository;
