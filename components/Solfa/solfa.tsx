import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import solfaData from '@/solfajson/solfa.json';
//  Types 
type SolfaItem = {
  id: number;
  title: string;
  file: string;
};
// Composant 
export default function SolfaScreen() {
  const router = useRouter();

  const solfas: SolfaItem[] = solfaData.solfas;

  const handlePress = (item: SolfaItem): void => {
    router.push({
      pathname: '/SolfaView',
      params: { id: String(item.id) },
    });
  };
  const renderItem: ListRenderItem<SolfaItem> = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.numBadge}>
        <Text style={styles.numText}>{item.id}</Text>
      </View>
      <Text style={styles.titre} numberOfLines={1}>
        {item.title}
      </Text>
      <Ionicons name="chevron-forward" size={20} color="#bbb" />
    </TouchableOpacity>
  );

  const Separator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Solfa</Text>
        <Text style={styles.headerCount}>hira {solfas.length}</Text>
      </View>

      <FlatList<SolfaItem>
        data={solfas}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
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
    backgroundColor: '#F8F7FC',
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
  list: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  separator: {
    height: 6,
  },
  row: {
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
});