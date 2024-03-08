export class Payload {
  toFormData() {
    const formData = new FormData();
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const value = this[key];
        if (typeof value === 'string' || value instanceof Blob) {
          formData.append(key, value);
        }
      }
    }
    return formData;
  }

  toJson() {
    return JSON.stringify(this);
  }
}
