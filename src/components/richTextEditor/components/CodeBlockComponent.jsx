import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Import your preferred Highlight.js theme

const CodeBlockComponent = (props) => {
  console.log('hit code component')
  const codeBlockRef = useRef(null)

  useEffect(() => {
    hljs.highlightBlock(codeBlockRef.current);
  }, [props.codeContent]);

  return (
    <div className='formatted_code_block' data-offset-key={props.offsetKey}>
      <pre>
        <code ref={codeBlockRef} className={props.language}>
          {props.codeContent}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlockComponent;
