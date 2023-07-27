import axios from "axios";

// Replace the below URL with your API endpoint URL
const REGISTER_API_URL = "http://localhost:3000/api/auth/register";
const LOGIN_API_URL = "http://localhost:3000/api/auth/login";

// Sample user data for testing
const sampleUserData = {
  email: "test6907@example.com",
  password: "testpassword",
};

describe("Register API", () => {
  it("registers a new user successfully", async () => {
    try {
      const response = await axios.post(REGISTER_API_URL, sampleUserData);
      expect(response.status).toBe(200);
    } catch (error: any) {
      throw new Error(error.message);
    }
  });
  it("login a new user successfully", async () => {
    try {
      const response = await axios.post(LOGIN_API_URL, sampleUserData);
      expect(response.status).toBe(201);
    } catch (error: any) {
      throw new Error(error.message);
    }
  });
});
