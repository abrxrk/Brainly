export class ApiResponse<T> {
  success: true;
  message: String;
  data?: T;
  constructor(message: String, data?: T) {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}
