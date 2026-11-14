
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { jwtDecode } from 'jwt-decode';

import {
  saveToken,
  getToken,
  removeToken,
} from '../storage/auth.storage';

interface TokenPayload {
  idUsuario: number | null;
  idPessoa: number | null;
  userName: string;
  tipoUsuario: string;
}

interface User {
  id: number | null;
  idPessoa: number | null;
  name: string;
  tipoUsuario: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;

  isAuthenticated: boolean;
  isProfessor: boolean;
  isStudent: boolean;
  isAdmin: boolean;

  canComment: boolean;
  canCreatePost: boolean;
  canAccessManagement: boolean;
  canManageAnyPost: boolean;

  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const carregarUsuario = (decoded: TokenPayload) => {
    setUser({
      id: decoded.idUsuario,
      idPessoa: decoded.idPessoa,
      name: decoded.userName,
      tipoUsuario: decoded.tipoUsuario,
    });
  };

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedToken = await getToken();

        if (storedToken) {
          const decoded = jwtDecode<TokenPayload>(storedToken);

          setToken(storedToken);
          carregarUsuario(decoded);
        }
      } catch (error) {
        console.error('Erro ao recuperar autenticação:', error);

        await removeToken();
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuth();
  }, []);

  const login = async (newToken: string) => {
    const decoded = jwtDecode<TokenPayload>(newToken);

    await saveToken(newToken);

    setToken(newToken);
    carregarUsuario(decoded);
  };

  const logout = async () => {
    await removeToken();

    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user;

  const isProfessor = user?.tipoUsuario === 'P';
  const isStudent = user?.tipoUsuario === 'A';
  const isAdmin = user?.tipoUsuario === 'D';

  const canComment = isAuthenticated;

  const canCreatePost = isProfessor || isAdmin;

  const canAccessManagement = isProfessor || isAdmin;

  const canManageAnyPost = isAdmin;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,

        isAuthenticated,
        isProfessor,
        isStudent,
        isAdmin,

        canComment,
        canCreatePost,
        canAccessManagement,
        canManageAnyPost,

        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth deve ser usado dentro de AuthProvider'
    );
  }

  return context;
};
