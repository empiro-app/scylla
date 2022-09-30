import ScyllaViewer from './components/viewer';
import ScyllaEditor from './components/editor';
function App() {
  return (
    <div className='App'>
      <ScyllaEditor
        proMode={false}
        editor={{
          bold: {
            enabled: true,
          },
          italic: {
            enabled: true,
          },
          underline: {
            enabled: true,
          },
          strikethrough: {
            enabled: true,
          },
        }}
      />
    </div>
  );
}

export default App;
