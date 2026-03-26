import { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity,StyleSheet, Alert, ActivityIndicator,KeyboardAvoidingView, Platform} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { criarNota, atualizarNota } from '../services/noteService';
import { auth } from '../services/firebaseConfig';

export default function NoteFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const editando = !!params.id;

  const [titulo, setTitulo] = useState(params.titulo as string || '');
  const [conteudo, setConteudo] = useState(params.conteudo as string || '');
  const [carregando, setCarregando] = useState(false);

  const handleSalvar = () => {
    if (!titulo || !conteudo) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    setCarregando(true);

    const user = auth.currentUser;
    if (!user) return;

    const acao = editando
      ? atualizarNota(params.id as string, titulo, conteudo)
      : criarNota(user.uid, titulo, conteudo);

    acao
      .then(() => {
        router.back();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Erro', 'Não foi possível salvar a nota.');
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
          <Text style={styles.tag}>{editando ? '// EDITAR NOTA' : '// NOVA NOTA'}</Text>
          <Text style={styles.titulo}>{editando ? 'EDITAR' : 'CRIAR'}<Text style={styles.tituloNeon}>.NOTA</Text></Text>
        </View>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
          <Text style={styles.botaoVoltarTexto}>VOLTAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha} />

      <Text style={styles.label}>TÍTULO</Text>
      <TextInput
        style={styles.input}
        placeholder="Título da nota..."
        placeholderTextColor="#444"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>CONTEÚDO</Text>
      <TextInput
        style={[styles.input, styles.inputArea]}
        placeholder="Escreva sua nota aqui..."
        placeholderTextColor="#444"
        value={conteudo}
        onChangeText={setConteudo}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.botao} onPress={handleSalvar} disabled={carregando}>
        {carregando
          ? <ActivityIndicator color="#0a0a0a" />
          : <Text style={styles.textoBotao}>{editando ? 'ATUALIZAR' : 'SALVAR'}</Text>
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
});