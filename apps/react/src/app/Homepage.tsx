
import {getHomepageText} from '@study/pagetext';
const text = getHomepageText()

export function Homepage() {
  return (<>
    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{ text.title }</h1>
    {text.paragraphs.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}
    </>);
}
