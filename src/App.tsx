import ScyllaViewer from './components/viewer';
import ScyllaEditor from './components/editor';
function App() {
  return (
    <div className='App'>
      {/* <ScyllaViewer
        pdfName='empiro'
        html='<strong>Hello world! My name is {{name}}</strong>'
        data={{
          name: 'Alex',
        }}
      /> */}
      <ScyllaEditor proMode={false} />
    </div>
  );
}

export default App;
