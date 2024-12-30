export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
  }
  
  export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
  }