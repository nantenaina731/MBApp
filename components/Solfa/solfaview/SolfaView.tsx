import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import solfaData from '@/solfajson/solfa.json';
import { solfaImages } from '@/SolfaImages/SolfaImage';
import { useState } from 'react';
//  Types 
const ZOOM_LEVELS = [0.6, 0.8, 1, 1.3, 1.6, 2];
type SolfaItem = {
  id: number;
  title: string;
  file: string;
};
// Composant 
export default function SolfaViewScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const screenWidth = Dimensions.get('window').width;

  const solfas: SolfaItem[] = solfaData.solfas;
  const solfa = solfas.find((s) => s.id === Number(id));
  const image = solfa ? solfaImages[solfa.file] : null;
  const [zoomIndex, setZoomIndex] = useState<number>(2); // commence à 1x
  const zoom = ZOOM_LEVELS[zoomIndex];

  const increaseZoom = (): void => {
    if (zoomIndex < ZOOM_LEVELS.length - 1) setZoomIndex(zoomIndex + 1);
  };

  const decreaseZoom = (): void => {
    if (zoomIndex > 0) setZoomIndex(zoomIndex - 1);
  };
  if (!solfa || !image) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Solfa introuvable</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2869CA" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerNum}>N° {solfa.id}</Text>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {solfa.title}
          </Text>
        </View>
        <View style={styles.fontControls}>
  <TouchableOpacity
    style={[styles.fontBtn, zoomIndex === 0 && styles.fontBtnDisabled]}
    onPress={decreaseZoom}
    disabled={zoomIndex === 0}
  >
    <Text style={styles.fontBtnText}>A-</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[styles.fontBtn, zoomIndex === ZOOM_LEVELS.length - 1 && styles.fontBtnDisabled]}
    onPress={increaseZoom}
    disabled={zoomIndex === ZOOM_LEVELS.length - 1}
  >
    <Text style={styles.fontBtnText}>A+</Text>
  </TouchableOpacity>
</View>
      </View>

      {/* Image solfa */}
      <ScrollView
       horizontal
       showsHorizontalScrollIndicator={false}
      >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        maximumZoomScale={3}
        minimumZoomScale={1}
      >
        <Image
          source={image}
          style={{ width: (screenWidth -1)* zoom, height: undefined, aspectRatio: 0.75 }}
          resizeMode="contain"
        />
      </ScrollView>
      </ScrollView>
      <TouchableOpacity onPress={() => router.push('/')} style={styles.iconBtn}>
    <Ionicons name="home" size={30} color="#2869CA" />
  </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#2869CA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 10,
    borderBottomEndRadius: 15,
  },
  backIcon: {
    color: '#fff',
    fontSize: 38,
    lineHeight: 34,
    fontWeight: '300',
  },
  headerInfo: {
    flex: 1,
    paddingTop: 15,
  },
  headerNum: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  notFound: {
    textAlign: 'center',
    marginTop: 60,
    color: '#aaa',
    fontSize: 15,
  },
  fontControls: {
    flexDirection: 'row',
    gap: 6,
    paddingTop: 19,
  },
  fontBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  fontBtnDisabled: {
    backgroundColor: '#2869CA',
  },
  fontBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  iconBtn: {
    width: 60,
    height: 60,
    marginLeft:"auto",
    marginRight:"auto",
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation:4,
    marginBottom:20
   
  },
});