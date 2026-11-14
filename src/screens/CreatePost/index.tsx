
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/auth.context';
import { postService } from '../../services/post.service';
import styles from './styles';


const LIMITES = {
  titulo: {
    minimo: 5,
    maximo: 50,
  },
  conteudo: {
    minimo: 10,
    maximo: 750,
  },
};

const contarCaracteres = (texto: string) => {
  const normalizado = texto.normalize('NFC');

  if (typeof Intl.Segmenter !== 'undefined') {
    const segmenter = new Intl.Segmenter('pt-BR', {
      granularity: 'grapheme',
    });

    return [...segmenter.segment(normalizado)].length;
  }

  return Array.from(normalizado).length;
};

export default function CreatePost() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async () => {
    const tituloFormatado = titulo.trim();
    const conteudoFormatado = conteudo.trim();

    const tamanhoTitulo = contarCaracteres(tituloFormatado);
    const tamanhoConteudo = contarCaracteres(conteudoFormatado);

    if (!user?.id) {
      Alert.alert(
        'Atenção',
        'Você precisa estar autenticado para criar um post.'
      );
      return;
    }

    if (
      tamanhoTitulo < LIMITES.titulo.minimo ||
      tamanhoTitulo > LIMITES.titulo.maximo
    ) {
      Alert.alert(
        'Atenção',
        `O título deve ter entre ${LIMITES.titulo.minimo} e ${LIMITES.titulo.maximo} caracteres.`
      );
      return;
    }

    if (
      tamanhoConteudo < LIMITES.conteudo.minimo ||
      tamanhoConteudo > LIMITES.conteudo.maximo
    ) {
      Alert.alert(
        'Atenção',
        `O conteúdo deve ter entre ${LIMITES.conteudo.minimo} e ${LIMITES.conteudo.maximo} caracteres.`
      );
      return;
    }

    try {
      setCarregando(true);

      await postService.criar({
        titulo: tituloFormatado.normalize('NFC'),
        conteudo: conteudoFormatado.normalize('NFC'),
        criadoPor: user.id,
      });

      Alert.alert(
        'Sucesso',
        'Post criado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } catch (error: any) {
      console.error('Erro ao criar post:', error);

      Alert.alert(
        'Erro',
        error?.response?.data?.message ||
          'Não foi possível criar o post. Tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Criar publicação</Text>

          <View style={styles.form}>
                <View style={styles.field}>
              <Text style={styles.label}>Título</Text>

              <TextInput
                style={styles.input}
                value={titulo}
                onChangeText={setTitulo}
                placeholder="Digite o título da publicação"
                placeholderTextColor="#999"
                maxLength={LIMITES.titulo.maximo}
                editable={!carregando}
                autoCapitalize="sentences"
              />

              <Text>
                {contarCaracteres(titulo)} / {LIMITES.titulo.maximo}
              </Text>
            </View>

            {/* CONTEÚDO */}
            <View style={styles.field}>
              <Text style={styles.label}>Conteúdo</Text>

              <TextInput
                style={styles.textArea}
                value={conteudo}
                onChangeText={setConteudo}
                placeholder="Escreva o conteúdo da publicação..."
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
                maxLength={LIMITES.conteudo.maximo}
                editable={!carregando}
                autoCapitalize="sentences"
              />

              <Text>
                {contarCaracteres(conteudo)} / {LIMITES.conteudo.maximo}
              </Text>
            </View>

            <View style={styles.actions}>
              <Pressable
                style={[
                  styles.cancelButton,
                  carregando && styles.disabledButton,
                ]}
                onPress={() => navigation.goBack()}
                disabled={carregando}
              >
                <Text style={styles.cancelButtonText}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.submitButton,
                  carregando && styles.disabledButton,
                ]}
                onPress={handleSubmit}
                disabled={carregando}
              >
                {carregando ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.submitButtonText}>
                    Publicar
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
