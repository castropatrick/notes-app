import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { useRouter, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default function CadastroScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handleCadastro = () => {
    if (!email || !senha || !confirmarSenha) {
      Alert.alert(t('attention'), t('fillAllFields'));
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert(t('attention'), t('passwordsDontMatch'));
      return;
    }
    if (senha.length < 6) {
      Alert.alert(t('attention'), t('passwordMinLength'));
      return;
    }
    setCarregando(true);
    createUserWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        await AsyncStorage.setItem('@user', JSON.stringify(userCredential.user));
        router.replace('/HomeScreen');
      })
      .catch((error) => {
        console.log(error.code, error.message);
        Alert.alert(t('error'), t('errorCreateAccount'));
      })
      .finally(() => setCarregando(false));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.tag}>{t('newUser')}</Text>
        <Text style={styles.titulo}>{t('registerTitle')}<Text style={styles.tituloNeon}>{t('registerTitleSuffix')}</Text></Text>
        <View style={styles.linha} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>{t('email')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('emailPlaceholder')}
          placeholderTextColor="#444"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>{t('password')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('passwordPlaceholder')}
          placeholderTextColor="#444"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={styles.label}>{t('confirmPassword')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('passwordPlaceholder')}
          placeholderTextColor="#444"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity style={styles.botao} onPress={handleCadastro} disabled={carregando}>
          {carregando
            ? <ActivityIndicator color="#0a0a0a" />
            : <Text style={styles.textoBotao}>{t('createAccount')}</Text>
          }
        </TouchableOpacity>

        <Link href="/" style={styles.link}>
          {t('hasAccount')}<Text style={styles.linkNeon}>{t('doLogin')}</Text>
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