class AppError { 
  constructor(message, status = 401) {
    this.message = message;
    this.status = status
  }
}

module.exports = AppError