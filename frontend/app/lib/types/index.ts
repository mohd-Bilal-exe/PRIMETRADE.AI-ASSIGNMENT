export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
  backlog: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  success: boolean;
  data: {
    tasks: Task[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: any[];
}
