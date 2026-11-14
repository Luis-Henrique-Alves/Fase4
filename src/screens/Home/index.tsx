
import React, { useState } from 'react';

import {
  View,
  Text,
  Pressable,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import { SearchBar } from '../../components/Searchbar';
import { PostList } from '../../components/PostList';

import { useAuth } from '../../context/auth.context';

import { styles } from './styles';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const navigation = useNavigation<any>();

  const {
  canCreatePost,
  canAccessManagement,
}   = useAuth();
  return (
    <View style={styles.container}>

      <Header />

      <View style={styles.mainContainer}>

        <View style={styles.welcomeContainer}>
          <View>
            <Text style={styles.title}>
              Bem-vindo.
            </Text>
          </View>
        </View>

        {(canCreatePost || canAccessManagement) && (
          <View style={styles.actionsContainer}>

            {canCreatePost && (
              <Pressable
                onPress={() => navigation.navigate('CreatePost')}
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.createButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.actionIcon}>
                  +
                </Text>

                <Text style={styles.actionText}>
                  Criar Post
                </Text>
              </Pressable>
            )}

            {canAccessManagement && (
              <Pressable
                onPress={() => navigation.navigate('Management')}
                style={({ pressed }) => [
                  styles.actionButton,
                  styles.managementButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.actionIcon}>
                  ⚙
                </Text>

                <Text style={styles.actionText}>
                  Gestão
                </Text>
              </Pressable>
            )}

          </View>
        )}

        <View style={styles.searchContainer}>
          <SearchBar
            onSearch={setSearchTerm}
            onClear={() => setSearchTerm('')}
          />
        </View>

        <View style={styles.postContainer}>
          <PostList
            searchTerm={searchTerm}
            onPostPress={(postId) =>
              navigation.navigate('PostDetail', {
                postId,
              })
            }
          />
        </View>

      </View>
    </View>
  );
};

export default Home;
