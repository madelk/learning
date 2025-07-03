import { getHomepageText } from '@study/pagetext';
const text = getHomepageText();

export function Homepage() {
  return (
    <>
      <h1 className={text.title.className}>{text.title.text}</h1>
      {text.paragraphs.text.map((paragraph: string, index: number) => (
        <p className={text.paragraphs.className} key={index}>
          {paragraph}
        </p>
      ))}
    </>
  );
}
