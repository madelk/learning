declare global {
  namespace JSX {
    interface IntrinsicElements {
      'custom-navbar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}