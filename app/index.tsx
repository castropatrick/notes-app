import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { useRouter, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import * as Notifications from 'expo-notifications';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const mudarIdioma = (lang: string) => {
    i18n.changeLanguage(lang);
  };

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
      Alert.alert(t('attention'), t('fillAllFields'));
      return;
    }
    setCarregando(true);
    signInWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        await AsyncStorage.setItem('@user', JSON.stringify(userCredential.user));

        try {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: t('welcomeTitle'),
              body: t('welcomeBody'),
            },
            trigger: null,
          });
        } catch (e) {
          console.log('Notificação indisponível no Expo Go');
        }

        router.replace('/HomeScreen');
      })
      .catch((error) => {
        console.log(error.code, error.message);
        Alert.alert(t('attention'), t('errorInvalidCredentials'));
      })
      .finally(() => setCarregando(false));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.tag}>{t('systemAccess')}</Text>
        <Text style={styles.titulo}>{t('appName')}<Text style={styles.tituloNeon}>{t('appNameSuffix')}</Text></Text>
        <View style={styles.linha} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
        <TouchableOpacity
          style={[styles.langBotao, { marginRight: 10, backgroundColor: i18n.language === 'pt' ? '#b400ff' : '#222' }]}
          onPress={() => mudarIdioma('pt')}
        >
          <Text style={styles.langTexto}>PT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langBotao, { backgroundColor: i18n.language === 'en' ? '#b400ff' : '#222' }]}
          onPress={() => mudarIdioma('en')}
        >
          <Text style={styles.langTexto}>EN</Text>
        </TouchableOpacity>
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

        <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={carregando}>
          {carregando
            ? <ActivityIndicator color="#0a0a0a" />
            : <Text style={styles.textoBotao}>{t('login')}</Text>
          }
        </TouchableOpacity>

        <Link href="/CadastroScreen" style={styles.link}>
          {t('noAccount')}<Text style={styles.linkNeon}>{t('register')}</Text>
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
  langBotao: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  langTexto: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },
});