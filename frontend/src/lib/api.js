const API_BASE_URL = "https://brainly-66t4.onrender.com/api/v1";


class ApiClient {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem("brainly-token");

    const headers = {
      ...options.headers,
    };

    if (token && !options.skipAuth) {
      headers.Authorization = token;
    }

    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const config = {
      ...options,
      headers,
    };

    if (options.body && !(options.body instanceof FormData)) {
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Request failed" }));
      throw new Error(error.message || "Request failed");
    }

    return response.json();
  }

  // Auth
  async signup(data) {
    return this.request("/signup", {
      method: "POST",
      body: data,
      skipAuth: true,
    });
  }

  async login(data) {
    return this.request("/login", {
      method: "POST",
      body: data,
      skipAuth: true,
    });
  }

  async logout() {
    return this.request("/logout", { method: "POST" });
  }

  // Content
  async getContent() {
    return this.request("/content");
  }

  async createContent(data) {
    return this.request("/addContent", {
      method: "POST",
      body: data,
    });
  }

  async updateContent(id, data) {
    return this.request(`/content/${id}`, {
      method: "PUT",
      body: data,
    });
  }

  async deleteContent(id) {
    return this.request(`/content/${id}`, {
      method: "DELETE",
    });
  }

  // Share
  async createShareLink() {
    return this.request("/brain/share", {
      method: "POST",
    });
  }

  async getSharedContent(id) {
    return this.request(`/brain/share/${id}`, {
      skipAuth: true,
    });
  }
}

export const api = new ApiClient();
export const CONTENT_TYPES = ["image", "video", "article", "audio"];
