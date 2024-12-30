import { CreateUserDto, UpdateUserDto } from "@/DTO's/user-dto";
import { apiClient, PaginationParams } from "@/utils/api-client";
import { User } from "@/utils/types/user";

export const userApi = {
    getUsers: async (params?: PaginationParams) => {
      return apiClient.get<User[]>('/users', { 
        params: params as Record<string, string> 
      });
    },
  
    getUser: async (id: string) => {
      return apiClient.get<User>(`/users/${id}`);
    },
  
    createUser: async (userData: CreateUserDto) => {
      return apiClient.post<User>('/users', userData);
    },
  
    updateUser: async (id: string, userData: UpdateUserDto) => {
      return apiClient.patch<User>(`/users/${id}`, userData);
    },
  
    deleteUser: async (id: string) => {
      return apiClient.delete<void>(`/users/${id}`);
    },
  
    uploadAvatar: async (id: string, file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);
      return apiClient.upload<{ avatarUrl: string }>(`/users/${id}/avatar`, formData);
    },
  };