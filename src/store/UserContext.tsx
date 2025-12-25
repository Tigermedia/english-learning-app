import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

// Storage key for persisting user ID
const USER_STORAGE_KEY = 'english-app-user-id';

// User type
interface User {
  _id: Id<'users'>;
  name: string;
  age: number;
  avatarEmoji?: string;
  createdAt: number;
  lastLoginAt: number;
}

// Context type
interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (userId: Id<'users'>) => Promise<void>;
  logout: () => void;
  createUser: (name: string, age: number, avatarEmoji?: string) => Promise<Id<'users'>>;
}

const UserContext = createContext<UserContextType | null>(null);

// Provider
interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [userId, setUserId] = useState<Id<'users'> | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? (stored as Id<'users'>) : null;
    } catch {
      return null;
    }
  });

  // Fetch user data from Convex
  const userData = useQuery(
    api.users.getUser,
    userId ? { userId } : 'skip'
  );

  // Mutations
  const createUserMutation = useMutation(api.users.createUser);
  const updateLastLoginMutation = useMutation(api.users.updateLastLogin);

  // Determine loading state
  const isLoading = userId !== null && userData === undefined;

  // Build user object
  const user = userData ? (userData as User) : null;

  // Persist userId to localStorage
  useEffect(() => {
    try {
      if (userId) {
        localStorage.setItem(USER_STORAGE_KEY, userId);
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (error) {
      console.warn('Failed to persist user ID:', error);
    }
  }, [userId]);

  // Login function
  const login = async (newUserId: Id<'users'>) => {
    setUserId(newUserId);
    await updateLastLoginMutation({ userId: newUserId });
  };

  // Logout function
  const logout = () => {
    setUserId(null);
  };

  // Create new user function
  const createUser = async (name: string, age: number, avatarEmoji?: string) => {
    const newUserId = await createUserMutation({ name, age, avatarEmoji });
    setUserId(newUserId);
    return newUserId;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Hook
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
