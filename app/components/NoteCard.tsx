import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

type Props = {
  titulo: string;
  conteudo: string;
  onEditar: () => void;
  onDeletar: () => void;
}

export default function NoteCard({ titulo, conteudo, onEditar, onDeletar }: Props) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardConteudo} onPress={onEditar}>
        <Text style={styles.cardTitulo}>{titulo}</Text>
        <Text style={styles.cardTexto} numberOfLines={2}>{conteudo}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDeletar}>
        <Text style={styles.deletar}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    borderRadius: 4,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1e1e1e',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardConteudo: {
    flex: 1,
  },
  cardTitulo: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardTexto: {
    color: '#555',
    fontSize: 13,
  },
  deletar: {
    color: '#ff003c',
    fontSize: 18,
    paddingLeft: 12,
    fontWeight: 'bold',
  },
});