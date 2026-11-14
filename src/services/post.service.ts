import { api } from './api';

export const postService = {
  listar(page = 1, limit = 10) {
    return api.get('/posts', {
      params: { page, limit },
    });
  },

  buscarPorId(id: string) {
    return api.get(`/posts/${id}`);
  },

  buscar(text: string) {
    return api.get('/posts/search', {
      params: {
        text,
      },
    });
  },

  criar(dados: any) {
    return api.post('/posts', dados);
  },

  atualizar(id: string, dados: any) {
    return api.put(`/posts/${id}`, dados);
  },

  remover(id: string) {
    return api.delete(`/posts/${id}`);
  },

  adicionarComentario(
    id: string,
    conteudo: string,
    idUsuario: string,
  ) {
    return api.post(`/posts/${id}/comentarios`, {
      conteudo,
      idUsuario,
    });
  },

  atualizarComentario(
    idComentario: string,
    conteudo: string,
  ) {
    return api.put(
      `/posts/comentarios/${idComentario}`,
      { conteudo }
    );
  },

  removerComentario(idComentario: string) {
    return api.delete(
      `/posts/comentarios/${idComentario}`
    );
  },
};