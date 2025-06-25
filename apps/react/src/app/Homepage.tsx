
import {getHomepageText} from '@study/pagetext';
const text = getHomepageText()

export function Homepage() {
  return (<>
    <h1 className={text.title.className}>{ text.title.text }</h1>
    {text.paragraphs.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}
    </>);
}
