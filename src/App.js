import { useState } from "react";
import SearchBox from "./components/SearchBox";
import ZipList from "./components/ZipList";
import "./App.css";
import { useEffect } from "react";
import axios from 'axios';

function App() {
  const [queryText, setQueryText] = useState('');
  const [zips, setZips] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3030/elastic?text=${queryText}`).then((result) => {
      const { records } = result.data;
      const tempZips = records.map((record) => { return { id: record.id, city: record.city, state: record.state }})
      setZips(tempZips);
    });
  }, [queryText])

  return (
    <div className="App">
      <SearchBox placeholder="Search Elasticsearch" setQueryText={setQueryText} />
      <ZipList zips={zips} />
    </div>
  );
}

export default App;
