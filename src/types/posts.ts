export interface Post {
  idPost: number;
  titulo: string;
  descricao: string;
  conteudo: string;
  criadoPor: number;
  dataCriacao: string;
  isDeleted: boolean;
}

export interface PostResponse {
  success: boolean;
  data: Post;
}

export interface PostListResponse {
  success: boolean;
  data: Post[];
}

export interface CreatePostDTO {
  titulo: string;
  conteudo: string;
  criadoPor: number;
}

export interface UpdatePostDTO {
  titulo: string;
  conteudo: string;
}
