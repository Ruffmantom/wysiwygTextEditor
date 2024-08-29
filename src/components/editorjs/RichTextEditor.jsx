import React, { useEffect, useRef } from "react";
import './style.css';
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import Code from '@editorjs/code';
import Warning from '@editorjs/warning';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';

export default function EditorJs() {
  const editorInstance = useRef(null);

  useEffect(() => {
    // Initialize Editor.js
    editorInstance.current = new EditorJS({
      holder: 'editor',
      tools: {
        header: Header,
        list: List,
        quote: Quote,
        code: Code,
        warning: Warning,
        marker: Marker,
        paragraph: Paragraph,

      },
    });

    // Cleanup function
    return () => {
      if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
        editorInstance.current.destroy();
      }
      editorInstance.current = null;
    };
  }, []);

  const handleSave = async () => {
    let infoData;
    try {
      await editorInstance.current.save().then((outputData) => {
        console.log('Article data: ', outputData)
        infoData = outputData
      }).catch((error) => {
        console.log('Saving failed: ', error)
      });
      console.log('Outside of Async: ', infoData)
      // You can also handle the output data, such as sending it to a server or saving it locally
    } catch (error) {
      console.log('Saving failed: ', error);
    }
  }; 

  return (
    <div>
      <div className="editor_js_cont" id="editor"></div>
      <div className="form_cont">
        <div className="form_group">
          <button onClick={handleSave}>Save Content</button>
        </div>
      </div>
    </div>
  );
}
