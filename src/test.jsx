import React, { useState, useRef, useCallback } from 'react';
import { convertToRaw, CompositeDecorator, Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const LinkEditorExample = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));
  const [showURLInput, setShowURLInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const editorRef = useRef(null);
  const urlRef = useRef(null);

  const focus = () => editorRef.current.focus();

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const logState = () => {
    const content = editorState.getCurrentContent();
    console.log(convertToRaw(content));
  };

  const promptForLink = useCallback((e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      setShowURLInput(true);
      setUrlValue(url);

      setTimeout(() => urlRef.current.focus(), 0);
    }
  }, [editorState]);

  const confirmLink = useCallback((e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    setShowURLInput(false);
    setUrlValue('');
    setTimeout(() => editorRef.current.focus(), 0);
  }, [editorState, urlValue]);

  const onLinkInputKeyDown = useCallback((e) => {
    if (e.which === 13) {
      confirmLink(e);
    }
  }, [confirmLink]);

  const removeLink = useCallback((e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
    }
  }, [editorState]);

  let urlInput;
  if (showURLInput) {
    urlInput = (
      <div style={styles.urlInputContainer}>
        <input
          onChange={(e) => setUrlValue(e.target.value)}
          ref={urlRef}
          style={styles.urlInput}
          type="text"
          value={urlValue}
          onKeyDown={onLinkInputKeyDown}
        />
        <button onMouseDown={confirmLink}>Confirm</button>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <div style={{ marginBottom: 10 }}>
        Select some text, then use the buttons to add or remove links on the selected text.
      </div>
      <div style={styles.buttons}>
        <button onMouseDown={promptForLink} style={{ marginRight: 10 }}>
          Add Link
        </button>
        <button onMouseDown={removeLink}>Remove Link</button>
      </div>
      {urlInput}
      <div style={styles.editor} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          placeholder="Enter some text..."
          ref={editorRef}
        />
      </div>
      <input onClick={logState} style={styles.button} type="button" value="Log State" />
    </div>
  );
};

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link}>
      {props.children}
    </a>
  );
};

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#3b5998',
    textDecoration: 'underline',
  },
};

export default LinkEditorExample;
