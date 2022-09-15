import Scylla from './components/scylla';
function App() {
  return (
    <div className='App'>
      <Scylla
        pdfName='empiro'
        html='<strong>Hello world! My name is {{name}}</strong>'
        data={{
          name: 'Alex',
        }}
        exportButton={true}
        exportButtonLabel='Export'
      />
    </div>
  );
}

export default App;
