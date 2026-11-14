import React, { useState } from 'react';

import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

import { useAuth } from '../../context/auth.context';
import { authService } from '../../services/auth.service';

import { styles } from './styles';

import axios from 'axios';

import { CommonActions } from '@react-navigation/native';

interface LoginProps {
  navigation: any;
}

export default function Login({ navigation }: LoginProps) {
  const { login } = useAuth();
  const { width } = useWindowDimensions();

  const isTablet = width >= 768;

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    userName: '',
    password: '',
  });

  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {
      userName: '',
      password: '',
    };

    if (!userName.trim()) {
      newErrors.userName = 'Informe seu usuário.';
    }

    if (!password.trim()) {
      newErrors.password = 'Informe sua senha.';
    }

    setErrors(newErrors);

    return !newErrors.userName && !newErrors.password;
  };

  const onSubmit = async () => {
    if (!validateForm() || isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      setGeneralError('');

      const response = await authService.login(
        userName.trim(),
        password
      );

      await login(response.accessToken);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Home' },
          ],
        })
      );

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setGeneralError(
          error.response?.data?.message ||
          'Não foi possível realizar o login. Verifique suas credenciais.'
        );

        return;
      }

      setGeneralError(
        error instanceof Error
          ? error.message
          : 'Não foi possível realizar o login. Tente novamente.'
      );

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.tabletScrollContent,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.container,
            isTablet && styles.tabletContainer,
          ]}
        >
          {isTablet && (
            <View style={styles.brandingSection}>
              <View style={styles.brandingContent}>
                <Text style={styles.brandingTitle}>
                  Fase 4 - FIAP
                </Text>

                <Text style={styles.brandingDescription}>
                  Aplicação desenvolvida para entrega de atividade
                  da fase 4 de pós-graduação em Desenvolvimento
                  de Software Full Stack pela FIAP.
                </Text>
              </View>
            </View>
          )}

          <View style={styles.loginSection}>
            <View style={styles.loginContainer}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>FIAP</Text>

                <View style={styles.logoLine} />

                <Text style={styles.logoSubtitle}>
                  FASE 4
                </Text>
              </View>

              <Text style={styles.title}>
                Bem-vindo
              </Text>

              <Text style={styles.subtitle}>
                Entre com suas credenciais para continuar.
              </Text>

              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Usuário
                  </Text>

                  <TextInput
                    style={[
                      styles.input,
                      errors.userName ? styles.inputError : null,
                    ]}
                    placeholder="Digite seu usuário"
                    placeholderTextColor="#999999"
                    value={userName}
                    onChangeText={(value) => {
                      setUserName(value);

                      setErrors((prev) => ({
                        ...prev,
                        userName: '',
                      }));
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLoading}
                    returnKeyType="next"
                    accessibilityLabel="Usuário"
                  />

                  {!!errors.userName && (
                    <Text style={styles.errorText}>
                      {errors.userName}
                    </Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    Senha
                  </Text>

                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[
                        styles.passwordInput,
                        errors.password ? styles.inputError : null,
                      ]}
                      placeholder="Digite sua senha"
                      placeholderTextColor="#999999"
                      value={password}
                      onChangeText={(value) => {
                        setPassword(value);

                        setErrors((prev) => ({
                          ...prev,
                          password: '',
                        }));
                      }}
                      secureTextEntry={!showPassword}
                      editable={!isLoading}
                      returnKeyType="done"
                      onSubmitEditing={onSubmit}
                      accessibilityLabel="Senha"
                    />

                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.showPasswordButton}
                      accessibilityRole="button"
                      accessibilityLabel={
                        showPassword ? 'Ocultar senha' : 'Mostrar senha'
                      }
                    >
                      <Text style={styles.showPasswordText}>
                        {showPassword ? 'Ocultar' : 'Mostrar'}
                      </Text>
                    </Pressable>
                  </View>

                  {!!errors.password && (
                    <Text style={styles.errorText}>
                      {errors.password}
                    </Text>
                  )}
                </View>

                {!!generalError && (
                  <Text style={styles.generalError}>
                    {generalError}
                  </Text>
                )}

                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                    isLoading && styles.buttonDisabled,
                  ]}
                  onPress={onSubmit}
                  disabled={isLoading}
                  accessibilityRole="button"
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.buttonText}>
                      Entrar
                    </Text>
                  )}
                </Pressable>
              </View>

              <Text style={styles.footer}>
                Projeto desenvolvido para a Fase 4 - FIAP
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
