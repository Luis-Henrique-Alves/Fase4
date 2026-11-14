
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

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  formatarDataBR,
  converterDataParaAPI,
} from '../../../utils/date.utils';

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

interface RouteParams {
  aluno?: Aluno;
}

const StudentForm = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { aluno } = (route.params || {}) as RouteParams;

  const editando = !!aluno;

  const [nomePessoa, setNomePessoa] = useState(
    aluno?.nomePessoa || ''
  );

const [dataNascimento, setDataNascimento] = useState(
  aluno?.dataNascimento
    ? formatarDataBR(aluno.dataNascimento)
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

      if (editando && aluno) {
        await pessoaService.atualizar(
          String(aluno.idPessoa),
          {
            nomePessoa: nome,
            dataNascimento: dataFormatada,
          }
        );
      } else {
        await pessoaService.criar({
          nomePessoa: nome,
          dataNascimento: dataFormatada,
          codigoTipoPessoa: 'A',
          usuario: {
            userName: userName.trim(),
            password,
          },
        });
      }

      Alert.alert(
        'Sucesso',
        editando
          ? 'Aluno atualizado com sucesso.'
          : 'Aluno cadastrado com sucesso.',
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
        'Não foi possível salvar o aluno.';

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
            {editando ? 'Editar aluno' : 'Novo aluno'}
          </Text>

          <Text style={styles.subtitle}>
            {editando
              ? 'Atualize os dados do aluno.'
              : 'Preencha os dados para cadastrar um novo aluno.'}
          </Text>
        </View>

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

export default StudentForm;
