import React, { useState, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable } from 'react-native';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
  StatusBar,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import FuseLib, { type IFuseOptions } from 'fuse.js';
import songsData from '../../allLyrics/songs.json';
export type Song = {
  id: number;
  title: string;
  lyrics: string[];
};
const fuseOptions: IFuseOptions<Song> = {
  keys: [
    { name: 'title',  weight: 0.6 },
    { name: 'lyrics', weight: 0.4 },
  ],
  threshold: 0.3,
  ignoreLocation: true,
};
const songs: Song[] = songsData.songs as unknown as Song[];
export default function SongListScreen() {
  const router = useRouter();
const [searchQuery, setSearchQuery] = useState<string>('');
const [menuVisible, setMenuVisible] = useState(false);
  const fuse = useMemo(() => new FuseLib(songs, fuseOptions), []);
  const results: Song[] = useMemo(() => {
    if (searchQuery.trim() === '') return songs;
    const num = Number(searchQuery.trim());
    if (!isNaN(num)) {
      return songs.filter((s) => s.id === num);
    }
    return fuse.search(searchQuery).map((r) => r.item);
  }, [searchQuery, fuse]);
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
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
  const ListEmpty = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>Aucune chanson trouvée</Text>
    </View>
  );
  const Separator = () => <View style={styles.separator} />;
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor={'#2869CA'} />
      <View style={styles.header}>
        <View style={styles.menu}>
        <Text style={styles.headerTitle}>MARAIMBAOVAO</Text>
 
<TouchableOpacity style={styles.barre} onPress={() => setMenuVisible(true)}>
<Ionicons
    name="menu"
    size={35}
    color="white"
  />
</TouchableOpacity>
<Modal
  transparent
  visible={menuVisible}
  animationType="fade"
  onRequestClose={() => setMenuVisible(false)}
>
  <Pressable
    style={{ flex: 1 }}
    onPress={() => setMenuVisible(false)}
  >
    <View
      style={{
        position: 'absolute',
        top:1,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 9,
        minWidth: 150,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
        }}
        onPress={() => {
          setMenuVisible(false);
          router.push('/favorite');
        }}
      >
        <Ionicons
          name="heart"
          size={20}
          color="#e74c3c"
        />
        <Text style={{ marginLeft: 10 }}>
          Favoris
        </Text>
      </TouchableOpacity>
      <View style={styles.Separator} />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
        }}
        onPress={() => {
          setMenuVisible(false);
          router.push('/solfa');
        }}
      >
        <Ionicons
          name="musical-note"
          size={22}
          color="black"
        />
        <Text style={{ marginLeft: 10 }}>
          Solfa
        </Text>
      </TouchableOpacity>
      <View style={styles.Separator} />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
        }}
        onPress={() => {
          setMenuVisible(false);
          router.push('/autre');
        }}
      >
        <Ionicons
          name="book"
          size={22}
          color="gray"
        />
        <Text style={{ marginLeft: 10 }}>
          Hira hafa
        </Text>
      </TouchableOpacity>
    </View>
  </Pressable>
</Modal>
  
        </View>
        <Searchbar
      placeholder="Tonony na Laharana..."
      onChangeText={setSearchQuery}
      value={searchQuery}
      placeholderTextColor="gray"
      style={styles.searchBar}
        />
      </View>
      <Text style={styles.countLabel}>hira {results.length}</Text>
      <FlatList<Song>
        data={results}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={ListEmpty}
        ItemSeparatorComponent={Separator}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
// Styles 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  menu:{
    flexDirection:"row",
    gap:133,
    marginBottom:10
  },
  header: {
    backgroundColor: '#2869CA',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 25,
    borderBottomEndRadius: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:10,
    bottom: 6
  },
  searchBar: {
    height: 50,       
    elevation:3,
  },
  countLabel: {
    fontSize: 12,
    color: '#888',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  list: {
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  separator: {
    height: 6,
  },
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
  },
  arrow: {
    fontSize: 22,
    color: '#bbb',
  },
  empty: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 15,
    color: '#aaa',
  },
  Separator: {
    height: 0.5,
    width: "70%",
    backgroundColor: "rgba(128,128,128,0.3)",
    left:15
  },
  barre: {
    bottom:9,
    right:2
  }
});