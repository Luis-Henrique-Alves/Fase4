
import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  View,
  ActivityIndicator,
} from 'react-native';

import {
  AuthProvider,
  useAuth,
} from './src/context/auth.context';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Post from './src/screens/CreatePost';
import Management from './src/screens/Management';
import PostDetail from './src/screens/PostDetails';

import TeacherList from './src/screens/Management/TeacherList';
import TeacherForm from './src/screens/Management/TeacherForm';

import StudentList from './src/screens/Management/StudentList';
import StudentForm from './src/screens/Management/StudentForm';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  const {
    isLoading,
    isAuthenticated,
    canCreatePost,
    canAccessManagement,
  } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />

      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
      />

      <Stack.Screen
        name="Login"
        component={Login}
      />

      {isAuthenticated && canCreatePost && (
        <Stack.Screen
          name="CreatePost"
          component={Post}
        />
      )}

      {isAuthenticated && canAccessManagement && (
        <>
          <Stack.Screen
            name="Management"
            component={Management}
          />

          <Stack.Screen
            name="TeacherList"
            component={TeacherList}
          />

          <Stack.Screen
            name="TeacherForm"
            component={TeacherForm}
          />

          <Stack.Screen
            name="StudentList"
            component={StudentList}
          />

          <Stack.Screen
            name="StudentForm"
            component={StudentForm}
          />
        </>
      )}

    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}
