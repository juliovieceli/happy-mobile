import React, { useCallback } from 'react';
import { Text, View, ViewProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

interface HeaderTitle {
  title: string;
  showCancel?: boolean;
}
export default function Header({ title, showCancel = true }: HeaderTitle) {
  const navigation = useNavigation();

  const handleGoBackToAppHomepage = useCallback(() => {
    navigation.navigate('OrphanagesMap');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>
      {showCancel ? (
        <BorderlessButton onPress={handleGoBackToAppHomepage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
}
