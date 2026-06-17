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
import { Ionicons } from '@expo/vector-icons';;
import songsData from '@/Autrelyrics/Autrelyrics.json';
// Types 
type OtherSong = {
  id: number;
  title: string;
  lyrics: string[];
};
//Composant
export default function AutreScreen() {
  const router = useRouter();
  const Autre: OtherSong[] = songsData.Autre as unknown as OtherSong[];
  const handlePress = (song: OtherSong): void => {
    router.push({
      pathname: '/autreScreen',
      params: { song: JSON.stringify(song) },
    });
  };
  const renderItem: ListRenderItem<OtherSong> = ({ item }) => (
    <TouchableOpacity
      style={styles.songRow}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.numBadge}>
        <Text style={styles.numText}>{item.id}</Text>
      </View>
      <Text style={styles.titre} numberOfLines={1}>
        {item.title.toLowerCase()}
      </Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Hira hafa</Text>
        <Text style={styles.headerCount}>hira {Autre.length}</Text>
      </View>

      {/* Liste */}
      <FlatList<OtherSong>
        data={Autre}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
}
//  Styles 
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
  arrow: {
    fontSize: 22,
    color: '#bbb',
  },
});