class FetchError extends Error {
  public code: number

  constructor(url: string, message: string = 'Not Found', code: number = 404) {
    const errorMessage = `${message}, url: ${url}`
    super(errorMessage)
    this.name = this.constructor.name
    this.code = code
  }
}

export { FetchError }
