class UserBookHistory {
  constructor(UserBookModel) {
    this.UserBook = UserBookModel;
  }

  async borrowBook(userBookData) {
    const { bookId, userId, borrowedAt } = userBookData;
    return this.UserBook.create({
      bookId,
      userId,
      borrowedAt,
    });
  }

  async returnBook(bookId, userId, score) {
    const lastRecord = await this.UserBook.findOne({
      order: [["borrowedAt", "DESC"]],
      where: {
        bookId,
        userId,
      },
    });

    await this.UserBook.update(
      {
        score,
        returnedAt: new Date(),
      },
      {
        where: {
          id: lastRecord.id,
        },
      }
    );
  }
}

module.exports = UserBookHistory;
