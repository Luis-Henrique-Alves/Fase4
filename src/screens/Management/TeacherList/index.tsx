
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

interface Professor {
  idPessoa: number;
  nomePessoa: string;
  dataNascimento: string;
  codigoTipoPessoa: string;
  usuarioAtivo: boolean;
  userName: string;
}

const TeacherList = () => {
  const navigation = useNavigation<any>();

  const [professores, setProfessores] = useState<Professor[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarProfessores = useCallback(async (atualizar = false) => {
    try {
      if (atualizar) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await pessoaService.listarProfessores();

      setProfessores(response.data.data);

    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar os professores.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarProfessores();
    }, [carregarProfessores])
  );

  const professoresFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return professores;
    }

    return professores.filter((professor) => (
      professor.nomePessoa.toLowerCase().includes(termo) ||
      professor.userName?.toLowerCase().includes(termo)
    ));
  }, [professores, busca]);

  const atualizarLista = () => {
    carregarProfessores(true);
  };

 
const alterarSituacaoProfessor = (professor: Professor) => {
  const ativar = !professor.usuarioAtivo;

  Alert.alert(
    ativar ? 'Reativar professor' : 'Desativar professor',
    ativar
      ? 'Deseja realmente reativar este professor? Ele poderá acessar o sistema novamente.'
      : 'Deseja realmente desativar este professor? Ele perderá o acesso ao sistema.',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: ativar ? 'Reativar' : 'Desativar',
        style: ativar ? 'default' : 'destructive',
        onPress: async () => {
          try {
            await pessoaService.alterarSituacao(
              String(professor.idPessoa),
              ativar
            );

            Alert.alert(
              'Sucesso',
              ativar
                ? 'Professor reativado com sucesso.'
                : 'Professor desativado com sucesso.'
            );

            await carregarProfessores(true);

          } catch (error) {
            Alert.alert(
              'Erro',
              ativar
                ? 'Não foi possível reativar o professor.'
                : 'Não foi possível desativar o professor.'
            );
          }
        },
      },
    ]
  );
};


  const abrirEdicao = (professor: Professor) => {
    navigation.navigate('TeacherForm', {
      professor,
    });
  };

  const renderItem = ({ item }: { item: Professor }) => (
    <View style={styles.card}>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>
            {item.nomePessoa}
          </Text>

          <Text style={styles.cardDescription}>
            @{item.userName}
          </Text>
        </View>

        <Text style={{
          color: item.usuarioAtivo
            ? theme.colors.success
            : theme.colors.error,
          fontWeight: theme.typography.fontWeight.medium,
          fontSize: theme.typography.fontSize.sm,
        }}>
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
  onPress={() => alterarSituacaoProfessor(item)}
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
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}>
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
          Professores
        </Text>

        <Text style={styles.subtitle}>
          Gerencie os professores cadastrados.
        </Text>

      </View>

      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate('TeacherForm')}
      >
        <Text style={styles.addButtonText}>
          + Novo professor
        </Text>
      </Pressable>

      <View style={styles.searchContainer}>

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar professor..."
          placeholderTextColor={theme.colors.secondary}
          value={busca}
          onChangeText={setBusca}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {busca.length > 0 && (
          <Pressable onPress={() => setBusca('')}>
            <Text style={{ color: theme.colors.secondary }}>
              ✕
            </Text>
          </Pressable>
        )}

      </View>

      <Text style={{
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.secondary,
        marginBottom: theme.spacing.md,
      }}>
        {professoresFiltrados.length} professor(es) encontrado(s)
      </Text>

      <FlatList
        data={professoresFiltrados}
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
              : 'Nenhum professor cadastrado. Cadastre um novo professor para começar.'}
          </Text>
        }
      />

    </View>
  );
};

export default TeacherList;
