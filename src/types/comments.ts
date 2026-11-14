export interface Comentario {
  idComentario: number;
  idPost: number;
  idUsuario: number;
  criadoPor: string | number;
  conteudo: string;
  criadoEm?: string;
  dataCriacao?: string;
}