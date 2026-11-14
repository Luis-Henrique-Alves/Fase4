
import React, { useCallback, useState, useMemo } from 'react';

import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';

import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import { pessoaService } from '../../../services/pessoa.service';
import theme from '../../../theme';
import { styles } from './styles';

interface Aluno {
  idPessoa: number;
  nomePessoa: string;
  dataNascimento: string;
  codigoTipoPessoa: string;
  usuarioAtivo: boolean;
  userName: string;
}

const StudentList = () => {
  const navigation = useNavigation<any>();

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarAlunos = useCallback(async (atualizar = false) => {
    try {
      if (atualizar) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await pessoaService.listarAlunos();

      setAlunos(response.data.data);

    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar os alunos.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarAlunos();
    }, [carregarAlunos])
  );

  const alunosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return alunos;
    }

    return alunos.filter((aluno) => (
      aluno.nomePessoa.toLowerCase().includes(termo) ||
      aluno.userName?.toLowerCase().includes(termo)
    ));
  }, [alunos, busca]);

  const atualizarLista = () => {
    carregarAlunos(true);
  };

  const alterarSituacao = (
    aluno: Aluno,
    usuarioAtivo: boolean
  ) => {
    Alert.alert(
      usuarioAtivo ? 'Reativar aluno' : 'Desativar aluno',
      usuarioAtivo
        ? 'Deseja realmente reativar este aluno?'
        : 'Deseja realmente desativar este aluno?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: usuarioAtivo ? 'Reativar' : 'Desativar',
          style: usuarioAtivo ? 'default' : 'destructive',
          onPress: async () => {
            try {
              await pessoaService.alterarSituacao(
                String(aluno.idPessoa),
                usuarioAtivo
              );

              Alert.alert(
                'Sucesso',
                usuarioAtivo
                  ? 'Aluno reativado com sucesso.'
                  : 'Aluno desativado com sucesso.'
              );

              await carregarAlunos(true);

            } catch (error) {
              Alert.alert(
                'Erro',
                usuarioAtivo
                  ? 'Não foi possível reativar o aluno.'
                  : 'Não foi possível desativar o aluno.'
              );
            }
          },
        },
      ]
    );
  };

  const abrirEdicao = (aluno: Aluno) => {
    navigation.navigate('StudentForm', {
      aluno,
    });
  };

  const renderItem = ({ item }: { item: Aluno }) => (
    <View style={styles.card}>

      <View style={styles.cardHeader}>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>
            {item.nomePessoa}
          </Text>

          <Text style={styles.cardDescription}>
            @{item.userName || 'Sem usuário'}
          </Text>
        </View>

        <Text
          style={[
            styles.status,
            {
              color: item.usuarioAtivo
                ? theme.colors.success
                : theme.colors.error,
            },
          ]}
        >
          {item.usuarioAtivo ? 'Ativo' : 'Inativo'}
        </Text>

      </View>

      <View style={styles.actions}>

        <Pressable
          style={styles.editButton}
          onPress={() => abrirEdicao(item)}
        >
          <Text style={styles.actionText}>
            Editar
          </Text>
        </Pressable>

        <Pressable
          style={
            item.usuarioAtivo
              ? styles.deleteButton
              : styles.activateButton
          }
          onPress={() => alterarSituacao(
            item,
            !item.usuarioAtivo
          )}
        >
          <Text style={styles.actionText}>
            {item.usuarioAtivo ? 'Desativar' : 'Reativar'}
          </Text>
        </Pressable>

      </View>

    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Text style={styles.title}>
          Alunos
        </Text>

        <Text style={styles.subtitle}>
          Gerencie os alunos cadastrados.
        </Text>

      </View>

      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate('StudentForm')}
      >
        <Text style={styles.addButtonText}>
          + Novo aluno
        </Text>
      </Pressable>

      <View style={styles.searchContainer}>

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar aluno..."
          placeholderTextColor={theme.colors.secondary}
          value={busca}
          onChangeText={setBusca}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {busca.length > 0 && (
          <Pressable onPress={() => setBusca('')}>
            <Text style={styles.clearButton}>
              ✕
            </Text>
          </Pressable>
        )}

      </View>

      <Text style={styles.resultsText}>
        {alunosFiltrados.length} aluno(s) encontrado(s)
      </Text>

      <FlatList
        data={alunosFiltrados}
        keyExtractor={(item) => String(item.idPessoa)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={atualizarLista}
            colors={[theme.colors.primary]}
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {busca
              ? 'Nenhum resultado encontrado. Tente outras palavras-chave.'
              : 'Nenhum aluno cadastrado. Cadastre um novo aluno para começar.'}
          </Text>
        }
      />

    </View>
  );
};

export default StudentList;
