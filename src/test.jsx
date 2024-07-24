import React, { useState, useRef, useCallback } from 'react';
import { convertToRaw, CompositeDecorator, Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const styles = {
  root: {
    fontFamily: 'arial',
    padding: 20,
    width: 600,
  },
  editor: {
    border: '1px solid #ddd',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: 'arial',
    marginRight: 10,
    padding: 3,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
};

const LinkEditorExample = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));
  const [showURLInput, setShowURLInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [labelValue, setLabelValue] = useState('');
  const editorRef = useRef(null);
  const urlRef = useRef(null);

  const focus = useCallback(() => {
    editorRef.current.focus();
  }, []);

  const handleChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
  }, []);

  const logState = useCallback(() => {
    const content = editorState.getCurrentContent();
    console.log(convertToRaw(content));
  }, [editorState]);

  const promptForLink = useCallback((e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffset = selection.getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      let label = contentState.getBlockForKey(startKey).getText().slice(startOffset, selection.getEndOffset());
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
        label = linkInstance.getData().label || label;
      }

      setShowURLInput(true);
      setUrlValue(url);
      setLabelValue(label);

      setTimeout(() => urlRef.current.focus(), 0);
    }
  }, [editorState]);

  const confirmLink = useCallback((e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: urlValue, label: labelValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    setShowURLInput(false);
    setUrlValue('');
    setLabelValue('');
    setTimeout(() => editorRef.current.focus(), 0);
  }, [editorState, urlValue, labelValue]);

  const handleLinkInputKeyDown = useCallback((e) => {
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

  const urlInput = showURLInput && (
    <URLInput
      urlValue={urlValue}
      labelValue={labelValue}
      onChangeUrl={(e) => setUrlValue(e.target.value)}
      onChangeLabel={(e) => setLabelValue(e.target.value)}
      onKeyDown={handleLinkInputKeyDown}
      onConfirm={confirmLink}
      ref={urlRef}
    />
  );

  return (
    <div style={styles.root}>
      <Instructions />
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
          onChange={handleChange}
          placeholder="Enter some text..."
          ref={editorRef}
        />
      </div>
      <input onClick={logState} style={styles.button} type="button" value="Log State" />
    </div>
  );
};

const Instructions = () => (
  <div style={{ marginBottom: 10 }}>
    Select some text, then use the buttons to add or remove links on the selected text.
  </div>
);

const URLInput = React.forwardRef(({ urlValue, labelValue, onChangeUrl, onChangeLabel, onKeyDown, onConfirm }, ref) => (
  <div style={styles.urlInputContainer}>
    <input
      onChange={onChangeLabel}
      style={styles.urlInput}
      type="text"
      value={labelValue}
      placeholder="Label"
    />
    <input
      onChange={onChangeUrl}
      ref={ref}
      style={styles.urlInput}
      type="text"
      value={urlValue}
      placeholder="URL"
      onKeyDown={onKeyDown}
    />
    <button onMouseDown={onConfirm}>Confirm</button>
  </div>
));

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    },
    callback
  );
}

const Link = (props) => {
  const { url, label } = props.contentState.getEntity(props.entityKey).getData();
  return <a href={url} style={{color:"blue",textDecoration:"underline"}}>{label || props.children}</a>;
};

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

export default LinkEditorExample;
