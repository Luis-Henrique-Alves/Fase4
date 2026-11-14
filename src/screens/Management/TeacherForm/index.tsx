
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { pessoaService } from '../../../services/pessoa.service';
import theme from '../../../theme';
import { styles } from './styles';

import {
  formatarDataBR,
  converterDataParaAPI,
} from '../../../utils/date.utils';

interface Professor {
  idPessoa: number;
  nomePessoa: string;
  dataNascimento: string;
  codigoTipoPessoa: string;
  usuarioAtivo: boolean;
  userName: string;
}

interface RouteParams {
  professor?: Professor;
}

const TeacherForm = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { professor } = (route.params || {}) as RouteParams;

  const editando = !!professor;

  const [nomePessoa, setNomePessoa] = useState(
    professor?.nomePessoa || ''
  );

const [dataNascimento, setDataNascimento] = useState(
  professor?.dataNascimento
    ? formatarDataBR(professor.dataNascimento)
    : ''
);

  const [userName, setUserName] = useState('');

  const [password, setPassword] = useState('');

  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [loading, setLoading] = useState(false);

  const salvar = async () => {
    const nome = nomePessoa.trim();
    const data = dataNascimento.trim();

    const dataFormatada = converterDataParaAPI(dataNascimento.trim());

    if (!dataFormatada) {
  Alert.alert(
    'Atenção',
    'Informe uma data válida no formato DD/MM/AAAA.'
  );
  return;
}

    if (!nome || !data) {
      Alert.alert(
        'Atenção',
        'Preencha o nome e a data de nascimento.'
      );
      return;
    }

    if (nome.length > 100) {
      Alert.alert(
        'Atenção',
        'O nome deve ter no máximo 100 caracteres.'
      );
      return;
    }

    if (!editando) {
      const usuario = userName.trim();

      if (!usuario || !password || !confirmarSenha) {
        Alert.alert(
          'Atenção',
          'Preencha todos os campos obrigatórios.'
        );
        return;
      }

      if (usuario.length > 100) {
        Alert.alert(
          'Atenção',
          'O nome de usuário deve ter no máximo 100 caracteres.'
        );
        return;
      }

      if (password.length < 8) {
        Alert.alert(
          'Atenção',
          'A senha deve possuir pelo menos 8 caracteres.'
        );
        return;
      }

      if (password !== confirmarSenha) {
        Alert.alert(
          'Atenção',
          'As senhas não coincidem.'
        );
        return;
      }
    }

    try {
      setLoading(true);

      if (editando && professor) {
        await pessoaService.atualizar(
          String(professor.idPessoa),
          {
            nomePessoa: nome,
            dataNascimento: dataFormatada,
          }
        );
      } else {
        await pessoaService.criar({
          nomePessoa: nome,
          dataNascimento: dataFormatada,
          codigoTipoPessoa: 'P',
          usuario: {
            userName: userName.trim(),
            password,
          },
        });
      }

      Alert.alert(
        'Sucesso',
        editando
          ? 'Professor atualizado com sucesso.'
          : 'Professor cadastrado com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );

    } catch (error: any) {
      const mensagem =
        error?.response?.data?.message ||
        'Não foi possível salvar o professor.';

      Alert.alert('Erro', mensagem);

    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <View style={styles.header}>
          <Text style={styles.title}>
            {editando ? 'Editar professor' : 'Novo professor'}
          </Text>

          <Text style={styles.subtitle}>
            {editando
              ? 'Atualize os dados do professor.'
              : 'Preencha os dados para cadastrar um novo professor.'}
          </Text>
        </View>

        {/* Dados pessoais */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Dados pessoais
          </Text>

          <Text style={styles.label}>
            Nome completo *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o nome completo"
            placeholderTextColor={theme.colors.secondary}
            value={nomePessoa}
            onChangeText={setNomePessoa}
            maxLength={100}
            editable={!loading}
          />

          <Text style={styles.label}>
            Data de nascimento *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor={theme.colors.secondary}
            value={dataNascimento}
            onChangeText={setDataNascimento}
            keyboardType="numbers-and-punctuation"
            maxLength={10}
            editable={!loading}
          />

          <Text style={styles.helperText}>
            Informe a data no formato dia-mês-ano.
            Exemplo: 20/05/2000.
          </Text>
        </View>

        {!editando && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Dados de acesso
            </Text>

            <Text style={styles.label}>
              Nome de usuário *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite o nome de usuário"
              placeholderTextColor={theme.colors.secondary}
              value={userName}
              onChangeText={setUserName}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={100}
              editable={!loading}
            />

            <Text style={styles.label}>
              Senha *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Mínimo de 8 caracteres"
              placeholderTextColor={theme.colors.secondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />

            <Text style={styles.label}>
              Confirmar senha *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite novamente a senha"
              placeholderTextColor={theme.colors.secondary}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
              editable={!loading}
            />
          </View>
        )}

        <View style={styles.actions}>

          <Pressable
            style={[
              styles.cancelButton,
              loading && styles.disabledButton,
            ]}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>
              Cancelar
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.saveButton,
              loading && styles.disabledButton,
            ]}
            onPress={salvar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.colors.white} />
            ) : (
              <Text style={styles.saveButtonText}>
                {editando ? 'Salvar alterações' : 'Cadastrar'}
              </Text>
            )}
          </Pressable>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TeacherForm;
