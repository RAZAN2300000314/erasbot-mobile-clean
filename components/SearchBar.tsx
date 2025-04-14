import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", value, onChangeText }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Image
        source={require('../assets/images/search.png')} // use your search icon
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={colors.text + '88'}
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
    elevation: 2,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#999',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBar;
