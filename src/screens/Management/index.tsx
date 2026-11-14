
import {
  View,
  Text,
  Pressable,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

const Management = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>
          Gestão
        </Text>

        <Text style={styles.subtitle}>
          Painel administrativo
        </Text>
      </View>

      <View style={styles.intro}>
        <Text style={styles.description}>
          Selecione uma área para gerenciar.
        </Text>
      </View>

      <View style={styles.cardsContainer}>

        {/* Professores */}

        <Pressable
          onPress={() => navigation.navigate('TeacherList')}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>
              🎓
            </Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Professores
            </Text>

            <Text style={styles.cardDescription}>
              Gerencie os professores cadastrados.
            </Text>
          </View>

          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>
              ›
            </Text>
          </View>
        </Pressable>

        {/* Alunos */}

        <Pressable
          onPress={() => navigation.navigate('StudentList')}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>
              👥
            </Text>
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>
              Alunos
            </Text>

            <Text style={styles.cardDescription}>
              Gerencie os alunos cadastrados.
            </Text>
          </View>

          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>
              ›
            </Text>
          </View>
        </Pressable>

      </View>

    </View>
  );
};

export default Management;
