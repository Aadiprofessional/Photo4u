import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, ActivityIndicator, Image, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

const { width } = Dimensions.get('window');
const API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s';
const CACHE_KEY = 'cached_image_urls';

export default function Home({ navigation, handleLogout }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const cachedUrls = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedUrls) {
          setImages(JSON.parse(cachedUrls));
          setLoading(false);
        }

        const response = await axios.get(API_URL);
        const urls = response.data.photos.photo.map(photo => ({
          id: photo.id,
          url: photo.url_s
        }));

        setImages(urls);
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(urls));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const renderItem = ({ item }) => (
    <Image
      style={styles.image}
      source={{ uri: item.url }}
      resizeMode="cover"
    />
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width / 3 - sizes.margin,
    height: width / 3 - sizes.margin,
    margin: sizes.margin / 2,
  },
});
