import EditorJs from "./components/editorjs/RichTextEditor";
import MyEditor from "./components/MyEditor/myEditor";
import RichTextEditor from "./components/richTextEditor/RichTextEditor";

function App() {
  return (
    <div className="App">
      <div className="content">
<<<<<<< HEAD
        {/* <EditorJs /> */}
        {/* Examples */}
        <MyEditor />
=======
>>>>>>> 271fac3fad486a15c00d9759f4ea0d7a20258212
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
<<<<<<< HEAD
          }}
        /> */}
=======
            link: true,
            code: true,
            quote: true,
            divider: true,
            orderedList: true,
            unorderedList: true,
            info: true,
            monospace: true,
          }
        }} />


>>>>>>> 271fac3fad486a15c00d9759f4ea0d7a20258212
      </div>
    </div>
  );
}

export default App;
