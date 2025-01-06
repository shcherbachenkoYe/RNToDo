import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_AUTH_API_KEY;

export const authenticate = async (
  mode: string,
  email: string,
  password: string
) => {
  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    const token = response.data.idToken;

    return token;
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error("Authentication failed");
  }
};

export const createUser = (email: string, password: string) => {
  return authenticate("signUp", email, password);
};

export const login = (email: string, password: string) => {
  return authenticate("signInWithPassword", email, password);
};
