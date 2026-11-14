
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  Pencil,
  Trash2,
  Save,
  X,
} from 'lucide-react-native';

import { useAuth } from '../../context/auth.context';
import { postService } from '../../services/post.service';

import { Comments } from '../../components/Comments';

import type { Post } from '../../types/posts';
import type { Comentario } from '../../types/comments';

import theme from '../../theme/';
import { styles } from './styles';

interface RouteParams {
  postId: number;
}

export default function PostDetail() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { height } = useWindowDimensions();

  const { postId } = route.params as RouteParams;

  const {
    user,
    canComment,
    isProfessor,
    canManageAnyPost,
  } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  const [editandoPost, setEditandoPost] = useState(false);

  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoConteudoPost, setNovoConteudoPost] = useState('');

  const [erroPost, setErroPost] = useState('');

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const carregarPost = async () => {
      try {
        setLoading(true);

        const response = await postService.buscarPorId(
          String(postId)
        );

        const postEncontrado = response.data.data.post;
        const comentariosEncontrados = response.data.data.comentarios;

        setPost(postEncontrado);

        setComentarios(
          Array.isArray(comentariosEncontrados)
            ? comentariosEncontrados
            : []
        );

        setNovoTitulo(postEncontrado.titulo);
        setNovoConteudoPost(postEncontrado.conteudo);

      } catch (error) {
        console.error('Erro ao carregar publicação:', error);

        Alert.alert(
          'Erro',
          'Não foi possível carregar a publicação.',
          [
            {
              text: 'Voltar',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } finally {
        setLoading(false);
      }
    };

    carregarPost();
  }, [postId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
        />

        <Text style={styles.loadingText}>
          Carregando publicação...
        </Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Publicação não encontrada.
        </Text>
      </View>
    );
  }

  const podeEditarPost =
    canManageAnyPost ||
    (
      isProfessor &&
      String(user?.id) === String(post.criadoPor)
    );

  const podeExcluirPost = canManageAnyPost;

  const podeEditarComentario = (comentario: Comentario) =>
    canManageAnyPost ||
    (
      !!user &&
      String(user.id) === String(comentario.idUsuario)
    );

  const podeExcluirComentario = (_comentario: Comentario) =>
    canManageAnyPost;

  const iniciarEdicao = () => {
    setNovoTitulo(post.titulo);
    setNovoConteudoPost(post.conteudo);
    setErroPost('');
    setEditandoPost(true);
  };

  const cancelarEdicao = () => {
    setNovoTitulo(post.titulo);
    setNovoConteudoPost(post.conteudo);
    setErroPost('');
    setEditandoPost(false);
  };

  const handleSalvarPost = async () => {
    if (!podeEditarPost) {
      Alert.alert(
        'Acesso negado',
        'Você não tem permissão para editar esta publicação.'
      );
      return;
    }

    const tituloFormatado = novoTitulo.trim();
    const conteudoFormatado = novoConteudoPost.trim();

    if (tituloFormatado.length < 5) {
      setErroPost(
        'O título deve ter pelo menos 5 caracteres.'
      );
      return;
    }

    if (tituloFormatado.length > 150) {
      setErroPost(
        'O título não pode ultrapassar 150 caracteres.'
      );
      return;
    }

    if (conteudoFormatado.length < 5) {
      setErroPost(
        'O conteúdo deve ter pelo menos 5 caracteres.'
      );
      return;
    }

    if (conteudoFormatado.length > 750) {
      setErroPost(
        'O conteúdo não pode ultrapassar 750 caracteres.'
      );
      return;
    }

    try {
      setErroPost('');
      setSalvando(true);

      await postService.atualizar(
        post.idPost.toString(),
        {
          titulo: tituloFormatado,
          conteudo: conteudoFormatado,
        }
      );

      setPost({
        ...post,
        titulo: tituloFormatado,
        conteudo: conteudoFormatado,
      });

      setEditandoPost(false);

      Alert.alert(
        'Sucesso',
        'Publicação atualizada com sucesso!'
      );

    } catch (error) {
      console.error('Erro ao editar publicação:', error);

      setErroPost(
        'Não foi possível atualizar a publicação.'
      );
    } finally {
      setSalvando(false);
    }
  };

  const handleExcluirPost = () => {
    if (!podeExcluirPost) {
      Alert.alert(
        'Acesso negado',
        'Você não tem permissão para excluir esta publicação.'
      );
      return;
    }

    Alert.alert(
      'Excluir publicação',
      'Tem certeza de que deseja excluir esta publicação?',
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
              await postService.remover(
                post.idPost.toString()
              );

              Alert.alert(
                'Sucesso',
                'Publicação excluída com sucesso.',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('Home'),
                  },
                ]
              );

            } catch (error) {
              console.error(
                'Erro ao excluir publicação:',
                error
              );

              Alert.alert(
                'Erro',
                'Não foi possível excluir a publicação.'
              );
            }
          },
        },
      ]
    );
  };

  const handleNovoComentario = async (conteudo: string) => {
    if (!canComment || !user?.id) {
      throw new Error('Usuário não autenticado.');
    }

    await postService.adicionarComentario(
      String(postId),
      conteudo,
      String(user.id)
    );

    const response = await postService.buscarPorId(
      String(postId)
    );

    const comentariosAtualizados =
      response.data.data.comentarios;

    setComentarios(
      Array.isArray(comentariosAtualizados)
        ? comentariosAtualizados
        : []
    );
  };

  const handleEditarComentario = async (
    idComentario: number,
    novoConteudo: string
  ) => {
    await postService.atualizarComentario(
      String(idComentario),
      novoConteudo
    );

    setComentarios((prev) =>
      prev.map((comentario) =>
        comentario.idComentario === idComentario
          ? {
              ...comentario,
              conteudo: novoConteudo,
            }
          : comentario
      )
    );
  };

  const handleExcluirComentario = async (
    idComentario: number
  ) => {
    await postService.removerComentario(
      String(idComentario)
    );

    setComentarios((prev) =>
      prev.filter(
        (comentario) =>
          comentario.idComentario !== idComentario
      )
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >

      <View
        style={[
          styles.postCard,
          {
            height: height * 0.7,
          },
        ]}
      >

        <View style={styles.header}>

          <Text style={styles.sectionLabel}>
            PUBLICAÇÃO
          </Text>

          <View style={styles.actions}>

            {podeEditarPost && (
              editandoPost ? (
                <>
                  <Pressable
                    onPress={cancelarEdicao}
                    disabled={salvando}
                    style={({ pressed }) => [
                      styles.iconButton,
                      pressed && styles.pressed,
                    ]}
                    accessibilityLabel="Cancelar edição"
                  >
                    <X
                      size={21}
                      color={theme.colors.secondary}
                    />
                  </Pressable>

                  <Pressable
                    onPress={handleSalvarPost}
                    disabled={salvando}
                    style={({ pressed }) => [
                      styles.iconButton,
                      styles.saveIconButton,
                      pressed && styles.pressed,
                    ]}
                    accessibilityLabel="Salvar alterações"
                  >
                    {salvando ? (
                      <ActivityIndicator
                        color={theme.colors.white}
                      />
                    ) : (
                      <Save
                        size={21}
                        color={theme.colors.white}
                      />
                    )}
                  </Pressable>
                </>
              ) : (
                <Pressable
                  onPress={iniciarEdicao}
                  style={({ pressed }) => [
                    styles.iconButton,
                    pressed && styles.pressed,
                  ]}
                  accessibilityLabel="Editar publicação"
                >
                  <Pencil
                    size={21}
                    color={theme.colors.primary}
                  />
                </Pressable>
              )
            )}

            {podeExcluirPost && (
              <Pressable
                onPress={handleExcluirPost}
                disabled={salvando}
                style={({ pressed }) => [
                  styles.iconButton,
                  styles.deleteIconButton,
                  pressed && styles.pressed,
                ]}
                accessibilityLabel="Excluir publicação"
              >
                <Trash2
                  size={21}
                  color={theme.colors.error}
                />
              </Pressable>
            )}

          </View>
        </View>

        <View style={styles.titleContainer}>

          {editandoPost ? (
            <>
              <Text style={styles.inputLabel}>
                Título
              </Text>

              <TextInput
                style={styles.titleInput}
                value={novoTitulo}
                onChangeText={setNovoTitulo}
                placeholder="Digite o título"
                maxLength={150}
                editable={!salvando}
              />

              <Text style={styles.counter}>
                {novoTitulo.length}/150
              </Text>
            </>
          ) : (
            <Text style={styles.title}>
              {post.titulo}
            </Text>
          )}

        </View>

        <View style={styles.contentContainer}>

          {editandoPost ? (
            <>
              <Text style={styles.inputLabel}>
                Conteúdo da publicação
              </Text>

              <TextInput
                style={styles.textArea}
                value={novoConteudoPost}
                onChangeText={setNovoConteudoPost}
                multiline
                textAlignVertical="top"
                maxLength={750}
                editable={!salvando}
                placeholder="Escreva o conteúdo da publicação..."
              />

              <Text style={styles.counter}>
                {novoConteudoPost.length}/750
              </Text>

              {!!erroPost && (
                <Text style={styles.errorText}>
                  {erroPost}
                </Text>
              )}
            </>
          ) : (
            <Text style={styles.postContent}>
              {post.conteudo}
            </Text>
          )}

        </View>

        <View style={styles.footer}>
          <Text style={styles.postDate}>
            Publicado em{' '}
            {new Date(post.dataCriacao).toLocaleDateString('pt-BR')}
          </Text>
        </View>

      </View>
      <Comments
        comentarios={comentarios}
        podeComentar={canComment}
        onNovoComentario={handleNovoComentario}
        podeEditar={podeEditarComentario}
        podeExcluir={podeExcluirComentario}
        onEditarComentario={handleEditarComentario}
        onExcluirComentario={handleExcluirComentario}
      />

    </ScrollView>
  );
}
