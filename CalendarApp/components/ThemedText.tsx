import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface ThemedTextProps extends TextProps {
  type?: 'link' | 'title' | 'default' | 'defaultSemiBold' | 'subtitle' | 'body';
}
const ThemedText: React.FC<ThemedTextProps> = ({ type, style, ...props }) => {
  // Define styles based on the type prop
  const textStyle = getTextStyle(type);
  return <Text style={[textStyle, style]} {...props} />;
};
const getTextStyle = (type?: string) => {
  switch (type) {
    case 'title':
      return styles.title;
    case 'link':
      return styles.link;
    case 'default':
      return styles.default;
    case 'defaultSemiBold':
      return styles.defaultSemiBold;
    case 'subtitle':
      return styles.subtitle;
    case 'body':
      return styles.body;
    default:
      return styles.default;
  }
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
  },
  default: {
    fontSize: 16,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  body: {
    fontSize: 16,
  },
});

export { ThemedText };
