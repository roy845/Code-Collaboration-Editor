import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SignupDto,
} from "../types/auth-credentials.dto";
import { axiosInstance, axiosPrivate, executeCodeApi } from "./api";
import { API_URLS } from "./api-urls";
import { AllowedRoles } from "../types/roles.types";
import {
  Auth,
  RefreshTokenResponse,
  UserResponseDTO,
} from "../types/authTypes.types";
import { LANGUAGE_VERSIONS } from "../constants/codeSnippets";
import { Languages } from "../types/language.types";

export const signUp = (
  signupDto: SignupDto
): Promise<{ data: UserResponseDTO }> => {
  try {
    const { signup } = API_URLS;

    return axiosInstance.post(signup, signupDto);
  } catch (error) {
    throw error;
  }
};

export const login = (loginDto: LoginDto): Promise<{ data: Auth }> => {
  try {
    const { login } = API_URLS;

    return axiosInstance.post(login, loginDto, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export const refreshToken = (): Promise<{ data: RefreshTokenResponse }> => {
  try {
    const { refreshToken } = API_URLS;

    return axiosInstance.get(refreshToken, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export const logout = (): Promise<void> => {
  try {
    const { logout } = API_URLS;

    return axiosInstance.get(logout, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = (
  forgotPasswordDto: ForgotPasswordDto
): Promise<{ data: string }> => {
  try {
    const { forgotPassword } = API_URLS;

    return axiosInstance.post(forgotPassword, forgotPasswordDto);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = (
  resetPasswordDto: ResetPasswordDto
): Promise<{ data: string }> => {
  try {
    const { resetPassword } = API_URLS;

    return axiosInstance.post(resetPassword, resetPasswordDto);
  } catch (error) {
    throw error;
  }
};

export const executeCode = async (language: Languages, sourceCode: string) => {
  const response = await executeCodeApi.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
