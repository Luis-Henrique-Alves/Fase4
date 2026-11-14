
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import { postService } from '../../services/post.service';
import type { Post } from '../../types/posts';

import { styles } from './styles';

interface Props {
  searchTerm?: string;
  onPostPress?: (postId: number) => void;
}

const LIMIT = 10;

export const PostList = ({
  searchTerm = '',
  onPostPress,
}: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = searchTerm.trim()
          ? await postService.buscar(searchTerm.trim())
          : await postService.listar(page, LIMIT);

        const result = response.data;

        if (!result.success) {
          throw new Error('Não foi possível carregar os posts.');
        }

        const postList: Post[] = Array.isArray(result.data)
          ? result.data
          : [];

        setPosts(postList);

        setHasNextPage(
          !searchTerm.trim() && postList.length === LIMIT
        );

      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        setPosts([]);
        setHasNextPage(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchTerm]);

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>
        {item.titulo}
      </Text>

      <Text style={styles.postAuthor}>
        Publicado por: Usuário {item.criadoPor}
      </Text>

      <Text style={styles.postDescription}>
        {item.descricao}
      </Text>

      <Text style={styles.postDate}>
        Publicado em{' '}
        {new Date(item.dataCriacao).toLocaleDateString('pt-BR')}
      </Text>

      <View style={styles.detailContainer}>
        <Pressable
          disabled={!onPostPress}
          onPress={() => onPostPress?.(item.idPost)}
          style={styles.detailButton}
        >
          <Text style={styles.detailButtonText}>
            Ver detalhes
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!!searchTerm && (
        <Text style={styles.searchTitle}>
          Resultados da busca por "{searchTerm}"
        </Text>
      )}

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#1976d2"
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => String(item.idPost)}
          renderItem={renderPost}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Nenhum post encontrado.
            </Text>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.paginationContainer}>
        <Pressable
          disabled={page === 1 || loading}
          onPress={() => setPage((prev) => prev - 1)}
          style={[
            styles.paginationButton,
            (page === 1 || loading) && styles.disabledButton,
          ]}
        >
          <Text style={styles.paginationText}>
            ⬅️ Anterior
          </Text>
        </Pressable>

        <Text style={styles.pageText}>
          Página {page}
        </Text>

        <Pressable
          disabled={!hasNextPage || loading}
          onPress={() => setPage((prev) => prev + 1)}
          style={[
            styles.paginationButton,
            (!hasNextPage || loading) && styles.disabledButton,
          ]}
        >
          <Text style={styles.paginationText}>
            Próximo ➡️
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
