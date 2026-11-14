
import { api } from './api';

export const pessoaService = {

  listar() {
    return api.get('/pessoas');
  },

  buscarPorId(id: string) {
    return api.get(`/pessoas/${id}`);
  },

  listarProfessores() {
    return api.get('/pessoas', {
      params: {
        codigoTipoPessoa: 'P',
      },
    });
  },

  listarAlunos() {
    return api.get('/pessoas', {
      params: {
        codigoTipoPessoa: 'A',
      },
    });
  },

  criar(dados: {
    nomePessoa: string;
    dataNascimento: string;
    codigoTipoPessoa: 'P' | 'A';
    usuario: {
      userName: string;
      password: string;
    };
  }) {
    return api.post('/pessoas', dados);
  },

  atualizar(id: string, dados: {
    nomePessoa: string;
    dataNascimento: string;
  }) {
    return api.put(`/pessoas/${id}`, dados);
  },

  remover(id: string) {
    return api.delete(`/pessoas/${id}`);
  },

  alterarSituacao(id: string, usuarioAtivo: boolean) {
    return api.patch(`/pessoas/${id}/situacao`, {
      usuarioAtivo,
    });
  },

};
