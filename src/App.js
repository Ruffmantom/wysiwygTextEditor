import CodeBlockComponent from "./components/richTextEditor/components/CodeBlockComponent";
import RichTextEditor from "./components/richTextEditor/RichTextEditor";
import EntityEditorExample from "./EntityExample";
import LinkEditorExample from "./test";

function App() {
  return (
    <div className="App">
      <div className="content">
        {/* <EntityEditorExample/> */}
        {/* <LinkEditorExample/> */}
        <RichTextEditor options={{
          tools: {
            bold: true,
            italic: true,
            highlight: true,
            color: true,
            headings: true,
            other: {
              underline: true,
              strikeThrough: true,
              removeFormats: true
            },
            link: true,
            code: true,
            quote: true,
            divider: true,
            orderedList:true,
            unorderedList:true,
            info:true,
            monospace:true,

          }
        }} />
        {/* <CodeBlockComponent codeLang={'HTML'} codeValue={"<a>Hello World!</a>"} /> */}
      </div>
    </div>
  );
}

export default App;
