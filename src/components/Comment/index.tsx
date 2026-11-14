
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  Pencil,
  Trash2,
  Save,
  X,
} from 'lucide-react-native';

import theme from '../../theme/';
import type { Comentario } from '../../types/comments';

import { styles } from './styles';

interface Props {
  comentario: Comentario;
  podeEditar?: boolean;
  podeExcluir?: boolean;
  onEditar?: (id: number, conteudo: string) => Promise<void> | void;
  onExcluir?: (id: number) => Promise<void> | void;
}

export const Comment = ({
  comentario,
  podeEditar = false,
  podeExcluir = false,
  onEditar,
  onExcluir,
}: Props) => {
  const [editando, setEditando] = useState(false);
  const [texto, setTexto] = useState(comentario.conteudo);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    setTexto(comentario.conteudo);
  }, [comentario.conteudo]);

  const cancelarEdicao = () => {
    setTexto(comentario.conteudo);
    setErro('');
    setEditando(false);
  };

  const handleSalvar = async () => {
    const valor = texto.trim();

    if (valor.length < 3) {
      setErro('O comentário deve ter pelo menos 3 caracteres.');
      return;
    }

    if (valor.length > 300) {
      setErro('O comentário não pode ultrapassar 300 caracteres.');
      return;
    }

    try {
      setSalvando(true);
      setErro('');

      await onEditar?.(comentario.idComentario, valor);

      setEditando(false);
    } catch (error) {
      console.error('Erro ao editar comentário:', error);
      setErro('Não foi possível editar o comentário.');
    } finally {
      setSalvando(false);
    }
  };

  const confirmarExclusao = () => {
    Alert.alert(
      'Excluir comentário',
      'Deseja realmente excluir este comentário?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await onExcluir?.(comentario.idComentario);
            } catch (error) {
              console.error('Erro ao excluir comentário:', error);

              Alert.alert(
                'Erro',
                'Não foi possível excluir o comentário.'
              );
            }
          },
        },
      ]
    );
  };

  const data = comentario.criadoEm ?? comentario.dataCriacao;

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>
            {String(comentario.criadoPor)}
          </Text>

          {data ? (
            <Text style={styles.date}>
              {new Date(data).toLocaleDateString('pt-BR')}
            </Text>
          ) : null}
        </View>

        <View style={styles.actions}>

          {podeEditar && (
            editando ? (
              <>
                <Pressable
                  onPress={cancelarEdicao}
                  disabled={salvando}
                  style={styles.iconButton}
                  accessibilityLabel="Cancelar edição"
                >
                  <X
                    size={19}
                    color={theme.colors.secondary}
                  />
                </Pressable>

                <Pressable
                  onPress={handleSalvar}
                  disabled={salvando}
                  style={[
                    styles.iconButton,
                    styles.saveButton,
                  ]}
                  accessibilityLabel="Salvar comentário"
                >
                  {salvando ? (
                    <ActivityIndicator
                      size="small"
                      color={theme.colors.white}
                    />
                  ) : (
                    <Save
                      size={19}
                      color={theme.colors.white}
                    />
                  )}
                </Pressable>
              </>
            ) : (
              <Pressable
                onPress={() => setEditando(true)}
                style={styles.iconButton}
                accessibilityLabel="Editar comentário"
              >
                <Pencil
                  size={19}
                  color={theme.colors.primary}
                />
              </Pressable>
            )
          )}

          {podeExcluir && (
            <Pressable
              onPress={confirmarExclusao}
              style={[
                styles.iconButton,
                styles.deleteButton,
              ]}
              accessibilityLabel="Excluir comentário"
            >
              <Trash2
                size={19}
                color={theme.colors.error}
              />
            </Pressable>
          )}

        </View>
      </View>

      {editando ? (
        <>
          <TextInput
            style={styles.input}
            value={texto}
            onChangeText={setTexto}
            multiline
            maxLength={300}
            editable={!salvando}
            textAlignVertical="top"
            placeholder="Edite seu comentário..."
          />

          <Text style={styles.counter}>
            {texto.length}/300
          </Text>

          {!!erro && (
            <Text style={styles.error}>
              {erro}
            </Text>
          )}
        </>
      ) : (
        <Text style={styles.content}>
          {comentario.conteudo}
        </Text>
      )}

    </View>
  );
};
