import React, { useState, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, Image} from 'react-native';
import sary from "@/assets/images/logo.png"
//import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
  StatusBar
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import FuseLib, { type IFuseOptions } from 'fuse.js';
import songsData from '../../allLyrics/songs.json';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
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
<View style={styles.inner}>
      <View style={styles.header}>
        <View style={styles.menu}>
        <View style={styles.logoTitre}>
        <Image source={sary} style={styles.logo}/>
        <Text style={styles.headerTitle}> STK MARAIMBAOVAO</Text>
        </View>
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
    right: width * 0.03,       
    bottom: height * 0.75,      
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 9,
    minWidth: width * 0.4,      
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
          router.push('/autreParole');
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
      placeholder="Tonony na laharana..."
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
      </View>
    </SafeAreaView>
  );
}
// Styles 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2869CA', 
  },
  inner: {
    flex: 1,
    backgroundColor: '#F8F7FC', 
  },
  menu:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 14,
  },
  header: {
    backgroundColor: '#2869CA',
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomEndRadius: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
    padding:4,
  },
  logo:{
    width:40,
    height:40,
    borderRadius:100,
  },
  logoTitre: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginRight: 'auto', 
  },
});