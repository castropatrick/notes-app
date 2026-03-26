import { useState, useEffect, useCallback } from 'react';
import {View, Text, FlatList, TouchableOpacity,StyleSheet, Alert, ActivityIndicator,TextInput, Platform} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { listarNotas, deletarNota } from '../services/noteService';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import NoteCard from './components/NoteCard';

export default function HomeScreen() {
  const [notas, setNotas] = useState<any[]>([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const carregarNotas = async () => {
    try {
      setCarregando(true);
      const user = auth.currentUser;
      if (!user) return;
      const dados = await listarNotas(user.uid);
      setNotas(dados);
    } catch (error) {
      console.log('Erro ao carregar notas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as notas.');
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarNotas();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair', style: 'destructive', onPress: async () => {
          await signOut(auth);
          await AsyncStorage.removeItem('@user');
          router.replace('/');
        }
      },
    ]);
  };

  const handleDeletar = (id: string) => {
    Alert.alert('Deletar', 'Tem certeza que deseja deletar esta nota?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar', style: 'destructive', onPress: async () => {
          await deletarNota(id);
          carregarNotas();
        }
      },
    ]);
  };

  const notasFiltradas = notas.filter(nota =>
    nota.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.tag}>// SISTEMA ATIVO</Text>
          <Text style={styles.titulo}>NOTAS<Text style={styles.tituloNeon}>.APP</Text></Text>
        </View>
        <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
          <Text style={styles.botaoSairTexto}>SAIR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha} />

      <TextInput
        style={styles.filtro}
        placeholder="// buscar nota..."
        placeholderTextColor="#444"
        value={filtro}
        onChangeText={setFiltro}
      />

      {carregando ? (
        <ActivityIndicator color="#39ff14" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={notasFiltradas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <Text style={styles.vazio}>// nenhuma nota encontrada</Text>
          }
        renderItem={({ item }) => (
        <NoteCard
            titulo={item.titulo}
            conteudo={item.conteudo}
            onEditar={() => router.push({ pathname: '/NoteFormScreen', params: { id: item.id, titulo: item.titulo, conteudo: item.conteudo } })}
            onDeletar={() => handleDeletar(item.id)}
        />
        )}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/NoteFormScreen')}
      >
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 20,
    shadowColor: '#b400ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 10,
  },
  botaoSair: {
    borderWidth: 1,
    borderColor: '#ff003c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  botaoSairTexto: {
    color: '#ff003c',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
  },
  filtro: {
    backgroundColor: '#111',
    color: '#39ff14',
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 16,
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier',
  },
  vazio: {
    color: '#333',
    textAlign: 'center',
    marginTop: 60,
    fontSize: 14,
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier',
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 28,
    backgroundColor: '#39ff14',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#39ff14',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 12,
  },
  fabTexto: {
    color: '#0a0a0a',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 32,
  },
});