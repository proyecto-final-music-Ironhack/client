import apiInstace from "./apiInstance";

class UploadService {
  constructor() {
    this.api = apiInstace;
  }
  uploadImage(imageForm) {
    return this.api.post("/upload/image", imageForm);
  }
}

const uploadService = new UploadService();

export default uploadService;
