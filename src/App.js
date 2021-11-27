import logo from "./logo.svg";
import SearchBox from "./components/SearchBox";
import "./App.css";

function App() {
  return (
    <div className="App">
      <SearchBox placeholder="Search Elasticsearch" />
      <SearchBox placeholder="Search MongoDB" />
    </div>
  );
}

export default App;
