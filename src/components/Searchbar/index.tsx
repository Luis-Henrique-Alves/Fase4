
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';

import { styles } from './styles';

interface Props {
  onSearch: (term: string) => void;
  onClear: () => void;
}

export const SearchBar = ({ onSearch, onClear }: Props) => {
  const [term, setTerm] = useState('');

  const handleSubmit = () => {
    onSearch(term);
  };

  const handleClear = () => {
    setTerm('');
    onClear();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={term}
        onChangeText={setTerm}
        placeholder="Buscar posts..."
        placeholderTextColor="#999999"
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
      />

      <Pressable
        style={({ pressed }) => [
          styles.searchButton,
          pressed && styles.pressed,
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          Buscar
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.clearButton,
          pressed && styles.pressed,
        ]}
        onPress={handleClear}
      >
        <Text style={styles.buttonText}>
          Limpar
        </Text>
      </Pressable>
    </View>
  );
};
