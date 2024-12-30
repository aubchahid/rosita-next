import { toast } from "sonner";

export interface ApiError {
    status: number;
    message: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
  }
  
  export interface RequestOptions extends Omit<RequestInit, 'headers'> {
    params?: Record<string, string>;
    timeout?: number;
    headers?: Record<string, string>;
  }
  
  export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  }
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dummyjson.com';

const defaultOptions: RequestOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const getAuthHeader = (): Record<string, string> => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return token ? { Authorization: `Bearer ${token}` } : {};
    }
    return {};
  };

  async function handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
  
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        toast.error(data.message || 'API Error');
        throw {
          status: response.status,
          message: data.message || 'API Error',
          data
        } as ApiError;
      }
      return data as T;
    }
    
    if (contentType?.includes('text/plain')) {
      const text = await response.text();
      
      if (!response.ok) {
        throw {
          status: response.status,
          message: text || 'API Error'
        } as ApiError;
      }
      return text as T;
    }
    
    if (response.status === 204) {
      return null as T;
    }
  
    throw new Error('Invalid response type');
  }

  async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    try {
      const { params, timeout, headers: customHeaders, ...fetchOptions } = options;
      
      let url = `${BASE_URL}${endpoint}`;
      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }
  
      const headers = {
        ...defaultOptions.headers,
        ...getAuthHeader(),
        ...customHeaders,
      } as Record<string, string>;
  
      const controller = new AbortController();
      if (timeout) {
        setTimeout(() => controller.abort(), timeout);
      }
  
      const response = await fetch(url, { 
        ...fetchOptions, 
        headers,
        signal: controller.signal 
      });
      
      return handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
      }
      console.error('API Request Failed:', error);
      throw error;
    }
  }
  
  export const apiClient = {
    get: async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
      return apiRequest<T>(endpoint, {
        ...options,
        method: 'GET',
      });
    },
  
    post: async <T>(endpoint: string, data: unknown, options: RequestOptions = {}): Promise<T> => {
      return apiRequest<T>(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  
    patch: async <T>(endpoint: string, data: unknown, options: RequestOptions = {}): Promise<T> => {
      return apiRequest<T>(endpoint, {
        ...options,
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },
  
    put: async <T>(endpoint: string, data: unknown, options: RequestOptions = {}): Promise<T> => {
      return apiRequest<T>(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
  
    delete: async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
      return apiRequest<T>(endpoint, {
        ...options,
        method: 'DELETE',
      });
    },
  
    upload: async <T>(endpoint: string, formData: FormData, options: RequestOptions = {}): Promise<T> => {
      return apiRequest<T>(endpoint, {
        ...options,
        method: 'POST',
        body: formData,
      });
    },
  
    custom: apiRequest,
  };
  
  