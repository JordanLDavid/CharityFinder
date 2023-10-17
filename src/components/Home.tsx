import { useEffect, useState } from "react";
import { CharityResponse } from "../types/types";
import axios from "axios";
import { Link } from "react-router-dom";
import jsonData from '../CausesList.json';

export const Home = () => {
    const headerStyle = {
      width: '100vw',
      height: 'auto',
    } as React.CSSProperties;

    const [results, setSearchResults] = useState<CharityResponse>();

    useEffect(() => {
      const data = jsonData.causes;

      const randomIndex = Math.floor(Math.random() * data.length);
      const apiKey = import.meta.env.VITE_API_KEY;
      axios.get<CharityResponse>("https://partners.every.org/v0.2/search/"+data[randomIndex]+"?apiKey="+apiKey)
      .then(response => {
        setSearchResults(response.data);
      })},[]);

    return (<>
            <div>
                <img src="CharityHeader.jpg" style={headerStyle}/>
                <ul className="m-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
                {results?.nonprofits.map((data)=> 
                <div key={data.ein} className="border border-solid border-gray-300 p-2 grid grid-rows-2">
                  <div className="min-content items-center flex justify-center p-2">
                    { (data.logoUrl !== undefined && data.logoUrl !== '' ?
                      <img src={data.logoUrl}></img> : 
                      <img src="GenericIcon.png" width="48" height="48"/> )}
                      </div>
                      <div className="gap-2 row-span-1 col-span-1 flex items-center justify-start">
                      <Link to={"/charity/"+data.ein}>{data.name}</Link>
                    </div>
                    <div className="row-span-1 col-span-2 flex items-start justify-center">
                    <p>{data.location}</p>
                    </div>
                </div>
                )}
          </ul>
          </div>
          </>);
};
