
import React from 'react';

import {
  View,
  Text,
  Pressable,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { LogOut, LogIn } from 'lucide-react-native';

import { useAuth } from '../../context/auth.context';

import { styles } from './styles';

const Header = () => {
  const navigation = useNavigation<any>();

  const { user, logout } = useAuth();

  const handleAuthAction = () => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }

    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Erro ao realizar logout:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        FIAP-FASE4
      </Text>

      <View style={styles.rightSection}>

        {user && (
          <Text style={styles.greeting}>
            Olá, {user.name}
          </Text>
        )}

        <Pressable
          onPress={handleAuthAction}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.buttonContent}>

            {user ? (
              <LogOut
                size={16}
                color="#FFFFFF"
              />
            ) : (
              <LogIn
                size={16}
                color="#FFFFFF"
              />
            )}

            <Text style={styles.logoutText}>
              {user ? 'Sair' : 'Logar'}
            </Text>

          </View>
        </Pressable>

      </View>

    </View>
  );
};

export default Header;
