import axios from "axios";

const API_URL = "http://localhost:3001/auth";

export const login = async (email: string, password: string) => {
  const response = await axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
  if (response.data.access_token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("access_token", response.data.access_token);
  }
  return response.data;
};

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const response = await axios.post(
    `${API_URL}/register`,
    { email, password, first_name: firstName, last_name: lastName },
    { withCredentials: true }
  );
  return response.data;
};

export const sendResetPasswordEmail = async (email: string) => {
  const response = await axios.post(
    `${API_URL}/send-reset-password-email`,
    { email },
    { withCredentials: true }
  );
  return response.data;
};

export const resetPassword = async (token: string, password: string) => {
  const response = await axios.post(
    `${API_URL}/reset-password?token=${token}`,
    { password },
    { withCredentials: true }
  );
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
};

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/validate-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      if (response.data.valid) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error("error", error);
    return false;
  }
};
