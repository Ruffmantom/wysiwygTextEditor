import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';


export default function CodeSnippet({ language, code }) {
    const codeRef = useRef(null);

  useEffect(() => {
    hljs.highlightElement(codeRef.current);
  }, [code, language]);

  return (
    <pre>
      <code ref={codeRef} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );

}
