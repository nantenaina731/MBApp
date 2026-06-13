import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
// Types 
type Song = {
  id: number;
  title: string;
  lyrics: string[];
};
//Composant
export default function FavoriteScreen() {
  const router = useRouter();
  const [favoris, setFavoris] = useState<Song[]>([]);
  // Recharge les favoris à chaque fois qu'on revient sur cet écran
  useFocusEffect(
    useCallback(() => {
      SecureStore.getItemAsync('favoris').then((stored) => {
        if (stored) setFavoris(JSON.parse(stored));
        else setFavoris([]);
      });
    }, [])
  );
  const removeFavori = async (id: number) => {
    const updated = favoris.filter((s) => s.id !== id);
    setFavoris(updated);
    await SecureStore.setItemAsync('favoris', JSON.stringify(updated));
  };
  const handlePress = (song: Song): void => {
    router.push({
      pathname: '/parole',
      params: { song: JSON.stringify(song) },
    });
  };

  const renderItem: ListRenderItem<Song> = ({ item }) => (
    <TouchableOpacity
      style={styles.songRow}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.numBadge}>
        <Text style={styles.numText}>{item.id}</Text>
      </View>
      <Text style={styles.titre} numberOfLines={1}>
        {item.title}
      </Text>
      <TouchableOpacity onPress={() => removeFavori(item.id)}>
        <Ionicons name="heart" size={22} color="#e74c3c" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const ListEmpty = () => (
    <View style={styles.empty}>
      <Ionicons name="heart-outline" size={60} color="#ddd" />
      <Text style={styles.emptyText}>Aucun favoris pour l'instant</Text>
    </View>
  );

  const Separator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favoris</Text>
        <Text style={styles.headerCount}>hira {favoris.length}</Text>
      </View>
      {/* Liste */}
      <FlatList<Song>
        data={favoris}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={ListEmpty}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
  backIcon: {
    color: '#fff',
    fontSize: 38,
    lineHeight: 34,
    fontWeight: '300',
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerCount: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
  },

  // Liste
  list: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  separator: {
    height: 6,
  },

  // Ligne chanson
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  numBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#2869CA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  titre: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#1a1a2e',
    textTransform: 'capitalize',
  },

  // Vide
  empty: {
    alignItems: 'center',
    marginTop: 180,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#aaa',
  },
  emptySub: {
    fontSize: 13,
    color: '#ccc',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});