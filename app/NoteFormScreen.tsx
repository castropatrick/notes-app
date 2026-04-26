import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { criarNota, atualizarNota } from '../services/noteService';
import { auth } from '../services/firebaseConfig';
import { useTranslation } from 'react-i18next';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

export default function NoteFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t: traducao } = useTranslation();
  const editando = !!params.id;
  const [titulo, setTitulo] = useState(params.titulo as string || '');
  const [conteudo, setConteudo] = useState(params.conteudo as string || '');
  const [carregando, setCarregando] = useState(false);
  const [localizacao, setLocalizacao] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setLocalizacao({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      } catch (error) {
        console.log('GPS indisponível, usando fallback');
      }
    })();
  }, []);

  const handleSalvar = () => {
    if (!titulo || !conteudo) {
      Alert.alert(traducao('attention'), traducao('fillAllFields'));
      return;
    }
    setCarregando(true);

    const user = auth.currentUser;
    if (!user) return;

    const acao = editando
      ? atualizarNota(params.id as string, titulo, conteudo)
      : criarNota(user.uid, titulo, conteudo, localizacao?.latitude, localizacao?.longitude);

    acao
      .then(async () => {
        if (!editando) {
          try {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: traducao('noteCreatedTitle'),
                body: traducao('noteCreatedBody'),
              },
              trigger: null,
            });
          } catch (e) {
            console.log('Notificação indisponível no Expo Go');
          }
        }
        router.back();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(traducao('error'), traducao('errorSaveNote'));
      })
      .finally(() => setCarregando(false));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.tag}>{editando ? traducao('editNote') : traducao('newNote')}</Text>
          <Text style={styles.titulo}>{editando ? traducao('editNoteTitle') : traducao('createNote')}<Text style={styles.tituloNeon}>{traducao('noteSuffix')}</Text></Text>
        </View>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
          <Text style={styles.botaoVoltarTexto}>{traducao('back')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha} />

      {localizacao && !editando && (
        <Text style={styles.gpsInfo}>
          GPS: {localizacao.latitude.toFixed(4)}, {localizacao.longitude.toFixed(4)}
        </Text>
      )}

      <Text style={styles.label}>{traducao('title')}</Text>
      <TextInput
        style={styles.input}
        placeholder={traducao('titlePlaceholder')}
        placeholderTextColor="#444"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>{traducao('content')}</Text>
      <TextInput
        style={[styles.input, styles.inputArea]}
        placeholder={traducao('contentPlaceholder')}
        placeholderTextColor="#444"
        value={conteudo}
        onChangeText={setConteudo}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.botao} onPress={handleSalvar} disabled={carregando}>
        {carregando
          ? <ActivityIndicator color="#0a0a0a" />
          : <Text style={styles.textoBotao}>{editando ? traducao('update') : traducao('save')}</Text>
        }
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  tag: {
    color: '#39ff14',
    fontSize: 11,
    letterSpacing: 2,
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier',
  },
  titulo: {
    fontSize: 32,
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
    marginBottom: 28,
    shadowColor: '#b400ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 10,
  },
  label: {
    color: '#39ff14',
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 6,
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
    marginBottom: 20,
  },
  inputArea: {
    height: 200,
  },
  botao: {
    backgroundColor: '#39ff14',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
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
  botaoVoltar: {
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  botaoVoltarTexto: {
    color: '#555',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
  },
  gpsInfo: {
    color: '#39ff14',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 16,
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier',
  },
});