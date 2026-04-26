import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';

export default function MapScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t: traducao } = useTranslation();

  const latitude = parseFloat(params.latitude as string);
  const longitude = parseFloat(params.longitude as string);
  const titulo = params.titulo as string;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.tag}>{traducao('mapTag')}</Text>
          <Text style={styles.titulo}>{traducao('mapTitle')}<Text style={styles.tituloNeon}>{traducao('mapSuffix')}</Text></Text>
        </View>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
          <Text style={styles.botaoVoltarTexto}>{traducao('back')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha} />

      <Text style={styles.gpsInfo}>
        GPS: {latitude.toFixed(4)}, {longitude.toFixed(4)}
      </Text>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title={titulo}
            pinColor="#b400ff"
          />
        </MapView>
      </View>
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
    marginBottom: 16,
    shadowColor: '#b400ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 10,
  },
  gpsInfo: {
    color: '#39ff14',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 12,
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier',
  },
  mapContainer: {
    flex: 1,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  map: {
    flex: 1,
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