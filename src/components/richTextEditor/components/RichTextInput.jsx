import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const RichTextInput = forwardRef(({ value, onChange }, ref) => {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    return (
        // <div
        //         ref={ref}
        //         className="editable_container"
        //         contentEditable="true"
        //         aria-multiline="true"
        //         spellCheck="true"
        //         role="textbox"
        //         // onFocus={handleFocus}
        //         // onSelect={handleSelection}
        //         // onKeyDown={handleKeyDown}
        //       ></div>

        <Editor editorState={editorState} onChange={setEditorState} />
    )
});

export default RichTextInput
