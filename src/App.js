// import EditorJs from "./components/editorjs/RichTextEditor";
import MyEditor from "./components/MyEditor/myEditor";
// import RichTextEditor from "./components/richTextEditor/RichTextEditor";

function App() {
  return (
    <div className="App">
      <div className="content"> 
        {/* <EditorJs /> */}
        {/* Examples */}
        <MyEditor />
        {/* WIP Tool */}
        {/* <RichTextEditor
          options={{
            tools: {
              bold: true,
              italic: true,
              highlight: true,
              color: true,
              headings: true,
              other: {
                underline: true,
                strikeThrough: true,
                removeFormats: true,
              },
              link: true,
              code: true,
              quote: true,
              divider: true,
              orderedList: true,
              unorderedList: true,
              info: true,
              monospace: true,
            },
          }}
        /> */}
      </div>
    </div>
  );
}

export default App;
