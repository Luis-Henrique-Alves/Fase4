
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import { Send, Lock } from 'lucide-react-native';

import type { Comentario } from '../../types/comments';

import { useAuth } from '../../context/auth.context';

import theme from '../../theme/';

import { Comment } from '../Comment';

import { styles } from './styles';

interface Props {
  comentarios: Comentario[];

  podeComentar: boolean;

  onNovoComentario: (conteudo: string) => Promise<void>;

  podeEditar?: (comentario: Comentario) => boolean;

  podeExcluir?: (comentario: Comentario) => boolean;

  onEditarComentario: (
    idComentario: number,
    novoConteudo: string
  ) => Promise<void>;

  onExcluirComentario: (
    idComentario: number
  ) => Promise<void>;
}

export const Comments = ({
  comentarios,
  podeComentar,
  onNovoComentario,
  podeEditar,
  podeExcluir,
  onEditarComentario,
  onExcluirComentario,
}: Props) => {

  const { user } = useAuth();

  const [novoComentario, setNovoComentario] = useState('');

  const [erro, setErro] = useState('');

  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async () => {
    const valor = novoComentario.trim();

    if (!user || !podeComentar) {
      setErro('Você precisa estar autenticado para comentar.');
      return;
    }

    if (valor.length < 3) {
      setErro('O comentário deve ter pelo menos 3 caracteres.');
      return;
    }

    if (valor.length > 300) {
      setErro('O comentário não pode ultrapassar 300 caracteres.');
      return;
    }

    try {
      setErro('');
      setEnviando(true);

      await onNovoComentario(valor);

      setNovoComentario('');

    } catch (error) {
      console.error('Erro ao enviar comentário:', error);

      setErro('Não foi possível enviar o comentário.');

    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>

        <Text style={styles.title}>
          Comentários
        </Text>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {comentarios.length}
          </Text>
        </View>

      </View>

      {comentarios.length === 0 ? (

        <View style={styles.emptyContainer}>

          <Text style={styles.emptyText}>
            Nenhum comentário ainda.
          </Text>

          <Text style={styles.emptyDescription}>
            Seja o primeiro a comentar nesta publicação!
          </Text>

        </View>

      ) : (

        comentarios.map((comentario) => (

          <Comment
            key={comentario.idComentario}
            comentario={comentario}
            podeEditar={podeEditar?.(comentario) ?? false}
            podeExcluir={podeExcluir?.(comentario) ?? false}
            onEditar={onEditarComentario}
            onExcluir={onExcluirComentario}
          />

        ))

      )}

      {podeComentar && user ? (

        <View style={styles.formContainer}>

          <Text style={styles.formTitle}>
            Adicionar comentário
          </Text>

          <TextInput
            style={styles.input}
            value={novoComentario}
            onChangeText={setNovoComentario}
            placeholder="Escreva seu comentário..."
            placeholderTextColor="#999"
            multiline
            maxLength={300}
            editable={!enviando}
            textAlignVertical="top"
          />

          <View style={styles.formFooter}>

            <Text style={styles.counter}>
              {novoComentario.length}/300
            </Text>

            <Pressable
              onPress={handleSubmit}
              disabled={enviando}
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.pressed,
                enviando && styles.disabledButton,
              ]}
            >

              {enviando ? (

                <ActivityIndicator
                  color={theme.colors.white}
                  size="small"
                />

              ) : (

                <>
                  <Text style={styles.submitText}>
                    Enviar
                  </Text>

                  <Send
                    size={17}
                    color={theme.colors.white}
                  />
                </>

              )}

            </Pressable>

          </View>

          {!!erro && (
            <Text style={styles.error}>
              {erro}
            </Text>
          )}

        </View>

      ) : (

        <View style={styles.loginNotice}>

          <Lock
            size={20}
            color={theme.colors.secondary}
          />

          <View style={styles.loginNoticeContent}>

            <Text style={styles.loginNoticeTitle}>
              Deseja participar da conversa?
            </Text>

            <Text style={styles.loginNoticeDescription}>
              Entre na sua conta para adicionar comentários.
            </Text>

          </View>

        </View>

      )}

    </View>
  );
};
