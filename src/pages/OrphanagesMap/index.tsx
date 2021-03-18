import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import { RectButton } from 'react-native-gesture-handler';
import mapMarker from '../../images/map-marker.png';

import styles from './styles';
import api from '../../services/api';

interface OrphanageProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}
const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);

  useFocusEffect(() => {
    api.get('orphanages').then((response) => {
      setOrphanages(response.data);
    });
  });

  const handleNavigateToOrphanagesDetail = useCallback(
    (id: number) => {
      navigation.navigate('OrphanageDetails', { id });
    },
    [navigation],
  );

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigation.navigate('SelectMapPosition');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -21.1681121,
          longitude: -47.8328526,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
          >
            <Callout
              onPress={() => handleNavigateToOrphanagesDetail(orphanage.id)}
              tooltip
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>
        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
};

export default OrphanagesMap;
