import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Navigation } from './components/Taskbar';
import { SearchBarProp } from './types/types';
import jsonData from './CausesList.json';
import { SearchResult } from './components/SearchResult';
import { CharityDetail } from './components/CharityDetail';
import { Favorite } from './components/Favorite';
import { NotFound } from './components/NotFound';


const App = () => {
  
  const [input, setInput] = useState("");
  const [filterData, setFilterData] = useState<string[]>([]);

  useEffect(() => {
      // save to storage when todos list is updated
      const data = jsonData.causes.filter(filter => filter.includes(input));
      setFilterData(data);
    }, [input]);

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const inputProps : SearchBarProp = {
    input: input,
    onChange: handleChange,
    filterData : filterData,
  };
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation {... inputProps}/>}>
          <Route index element={<Home />} />
          <Route path="charity/:id" element={<CharityDetail />} />
          <Route path="searchCharity/:cause" element={<SearchResult />} />
          <Route path="favorites" element={<Favorite />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
export default App;