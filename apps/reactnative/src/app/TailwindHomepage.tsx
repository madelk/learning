import React from 'react';
import { View, Text } from 'react-native';
import { getHomepageText } from '@study/pagetext';
// @ts-expect-error - NativeWind TypeScript issues
import { styled } from 'nativewind';

// Create styled components
const StyledView = styled(View);
const StyledText = styled(Text);

export function TailwindHomepage() {
  const text = getHomepageText();
  
  return (
    <StyledView className="flex-1 bg-white p-6">
      <StyledText className={text.title.className}>
        {text.title.text}
      </StyledText>
      {text.paragraphs.text.map((paragraph, index) => (
        <StyledText 
          key={index}
          className={text.paragraphs.className}
        >
          {paragraph}
        </StyledText>
      ))}
    </StyledView>
  );
}
