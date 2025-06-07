import axios from "axios";
import Constants from "expo-constants";

const apiBaseUrl = Constants.expoConfig?.extra?.apiBaseUrl as
	| string
	| undefined;

if (!apiBaseUrl) {
	console.warn(
		"API Base URL is not defined. Please check your app.json extra.apiBaseUrl configuration.",
	);
	// You might want to throw an error here or provide a default fallback if appropriate
	// throw new Error('API Base URL is not defined');
}

const apiClient = axios.create({
	baseURL: apiBaseUrl || "https://fallback.api.example.com/v1", // Fallback to prevent runtime error if not set
	headers: {
		"Content-Type": "application/json",
		// You can add other common headers here, like an API key if it's static
		// 'Authorization': `Bearer ${Constants.expoConfig?.extra?.apiKey}`,
	},
});

// Example interceptor for adding dynamic headers like auth tokens
apiClient.interceptors.request.use(
	async (config) => {
		// const token = await getAuthToken(); // Example function to get a token
		// if (token) {
		//   config.headers.Authorization = `Bearer ${token}`;
		// }
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Example interceptor for response error handling
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		// Handle errors globally
		console.error("API Error:", error.response?.status, error.response?.data);
		// You could also logout user on 401, refresh token, etc.
		return Promise.reject(error);
	},
);

export default apiClient;

// Example GET request function
// export const fetchData = async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
//   try {
//     const response = await apiClient.get<T>(endpoint, { params });
//     return response.data;
//   } catch (error) {
//     // Handle or rethrow error
//     console.error(`Error fetching data from ${endpoint}:`, error);
//     throw error;
//   }
// };

// Example POST request function
// export const postData = async <T, R>(endpoint: string, data: R): Promise<T> => {
//   try {
//     const response = await apiClient.post<T>(endpoint, data);
//     return response.data;
//   } catch (error) {
//     console.error(`Error posting data to ${endpoint}:`, error);
//     throw error;
//   }
// };
