import React, {useEffect} from 'react';
import { Editor, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useRichTextEditor } from "../contexts/RichTextEditorContext"
import { customStyleMap } from '../helpers/CustomStyleMaps';

const RichTextInput = () => {
    const { editorState, setEditorState, editorRef, focusEditor } = useRichTextEditor()

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    useEffect(() => {
        focusEditor();
      }, [focusEditor]);

    return (
        <Editor
            ref={editorRef}
            // onClick={()=>focusEditor()}
            className="editable_container"
            customStyleMap={customStyleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={setEditorState}
        />
    );
};

export default RichTextInput



