import React, { useState,useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
type Song = {
  id: number;
  title: string;
  lyrics: string[];
};
const PURPLE_LIGHT = '#EEEDFE';
const FONT_SIZES = [14, 16, 18, 22, 26];
export default function ParolesScreen() {
  const router = useRouter();
  const { song } = useLocalSearchParams();
  const data: Song = JSON.parse(song as string);
  const [fontIndex, setFontIndex] = useState<number>(1);
  const fontSize = FONT_SIZES[fontIndex];
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    SecureStore.getItemAsync('favoris').then((stored) => {
      if (stored) {
        const favoris: Song[] = JSON.parse(stored);
        setFavorite(favoris.some((s) => s.id === data.id));
      }
    });
  }, []);
  const handleFavorite = async () => {
    const newValue = !favorite;
    setFavorite(newValue);
    try {
      const stored = await SecureStore.getItemAsync('favoris');
      const favoris: Song[] = stored ? JSON.parse(stored) : [];
      const updated = newValue
        ? [...favoris, data]                          
        : favoris.filter((s) => s.id !== data.id);   
      await SecureStore.setItemAsync('favoris', JSON.stringify(updated));
      Alert.alert('Favoris', newValue ? 'Ajouté aux favoris' : 'Retiré des favoris');
    } catch (e) {
      console.error(e);
    }
  };
  const increaseFont = (): void => {
    if (fontIndex < FONT_SIZES.length - 1) setFontIndex(fontIndex + 1);
  };

  const decreaseFont = (): void => {
    if (fontIndex > 0) setFontIndex(fontIndex - 1);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'#2869CA'} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
        <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerNum}>N° {data.id}</Text>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {data.title}
          </Text>
        </View>
        {/* Contrôle taille de police */}
        <View style={styles.fontControls}>
          <TouchableOpacity
            style={[styles.fontBtn, fontIndex === 0 && styles.fontBtnDisabled]}
            onPress={decreaseFont}
            disabled={fontIndex === 0}
          >
            <Text style={styles.fontBtnText}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.fontBtn,
              fontIndex === FONT_SIZES.length - 1 && styles.fontBtnDisabled,
            ]}
            onPress={increaseFont}
            disabled={fontIndex === FONT_SIZES.length - 1}
          >
            <Text style={styles.fontBtnText}>A+</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Paroles */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Badge titre */}
        <View style={styles.titleBadge}>
          <Text style={styles.titleBadgeNum}>{data.id}</Text>
          <Text style={styles.titleBadgeTitle}>{data.title.toUpperCase()}</Text>
        </View>

        {/* Lignes */}
        {data.lyrics.map((ligne: string, index: number) =>
          ligne === '' ? (
            <View key={index} style={styles.gap} />
          ) : (
            <Text
              key={index}
              style={[styles.ligne, { fontSize, lineHeight: fontSize * 1.7 }]}
            >
              {ligne}
            </Text>
          )
        )}
        <View style={styles.bottomSpace} />
      </ScrollView>
      <View style={styles.fond}> 
      <TouchableOpacity
  onPress={handleFavorite}
>
  <Ionicons
    name={favorite ? 'heart' : 'heart-outline'}
    size={35}
    color="#e74c3c"
  />
</TouchableOpacity>
</View>
    </SafeAreaView>
  );
}
// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  fond: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  heart :{
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  // Header
  header: {
    backgroundColor: '#2869CA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 10,
    borderBottomEndRadius: 15,
  },
  backBtn: {
    paddingRight: 4,
  },
  backIcon: {
    color: '#fff',
    fontSize: 38,
    lineHeight: 34,
    fontWeight: '300',
  },
  headerInfo: {
    flex: 1,
    paddingTop:15
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

  // Contrôle police
  fontControls: {
    flexDirection: 'row',
    gap: 6,
    paddingTop:19
  },
  fontBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  fontBtnDisabled: {
    backgroundColor:"#2869CA",
  },
  fontBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  // Badge titre
  titleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  titleBadgeNum: {
    backgroundColor: PURPLE_LIGHT,
    color: '#2869CA',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  titleBadgeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color:'#2869CA' ,
    flex: 1,
    textTransform: 'capitalize',
  },

  // Paroles
  ligne: {
    color: '#1a1a2e',
  },
  gap: {
    height: 20,
  },
  bottomSpace: {
    height: 10,
  },
});