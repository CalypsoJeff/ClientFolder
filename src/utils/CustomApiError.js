class CustomApiError extends Error {
    constructor(message, customData) {
      super(message);
      this.name = this.constructor.name;
      this.data = customData;
  
      // Set the prototype explicitly for inheritance in older environments
      Object.setPrototypeOf(this, CustomApiError.prototype);
    }
  
    getCustomData() {
      return this.data;
    }
  }
  
  export default CustomApiError;
  