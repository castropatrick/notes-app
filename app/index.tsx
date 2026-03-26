import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { useRouter, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const usuarioSalvo = await AsyncStorage.getItem('@user');
        if (usuarioSalvo) router.replace('/HomeScreen');
      } catch (error) {
        console.log('Erro ao verificar login:', error);
      }
    };
    verificarLogin();
  }, []);

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    setCarregando(true);
    signInWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        await AsyncStorage.setItem('@user', JSON.stringify(userCredential.user));
        router.replace('/HomeScreen');
      })
      .catch((error) => {
        console.log(error.code, error.message);
        Alert.alert('Atenção', 'Credenciais inválidas, verifique e-mail e senha.');
      })
      .finally(() => setCarregando(false));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.tag}>ACESSO AO SISTEMA</Text>
        <Text style={styles.titulo}>NOTAS<Text style={styles.tituloNeon}>.APP</Text></Text>
        <View style={styles.linha} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>E-MAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="usuario@email.com"
          placeholderTextColor="#444"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>SENHA</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#444"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={carregando}>
          {carregando
            ? <ActivityIndicator color="#0a0a0a" />
            : <Text style={styles.textoBotao}>ENTRAR</Text>
          }
        </TouchableOpacity>

        <Link href="/CadastroScreen" style={styles.link}>
          Não tem conta? <Text style={styles.linkNeon}>Cadastre-se</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    padding: 28,
  },
  header: {
    marginBottom: 40,
  },
  tag: {
    color: '#39ff14',
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 8,
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier',
  },
  titulo: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 4,
  },
  tituloNeon: {
    color: '#b400ff',
  },
  linha: {
    height: 2,
    backgroundColor: '#b400ff',
    marginTop: 12,
    width: '40%',
    shadowColor: '#b400ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 10,
  },
  form: {
    gap: 8,
  },
  label: {
    color: '#39ff14',
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 4,
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier',
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    borderRadius: 4,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#39ff14',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#39ff14',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 10,
  },
  textoBotao: {
    color: '#0a0a0a',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 3,
  },
  link: {
    color: '#555',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 20,
  },
  linkNeon: {
    color: '#b400ff',
    fontWeight: 'bold',
  },
});