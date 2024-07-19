import RichTextEditor from "./components/richTextEditor/RichTextEditor";
function App() {
  return (
    <div className="App">
      <div className="content">
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
            divider: true
          }
        }} />
      </div>
    </div>
  );
}

export default App;
