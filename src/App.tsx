import ScyllaViewer from './components/viewer';
function App() {
  return (
    <div className='App'>
      <ScyllaViewer
        pdfName='empiro'
        html='<strong>Hello world! My name is {{name}}</strong>'
        data={{
          name: 'Alex',
        }}
      />
    </div>
  );
}

export default App;
