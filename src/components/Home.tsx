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
                <ul className="columns-3">
                {results?.nonprofits.map((data)=> 
                <div>
                    { (data.logoUrl !== undefined && data.logoUrl !== '' ?
                      <img src={data.logoUrl}></img> : 
                      <img src="GenericIcon.png" width="48" height="48"/> )}
                    <Link to={"/charity/"+data.ein}>{data.name}</Link>
                    <p>{data.location}</p>
                </div>
                )}
          </ul>
          </div>
          </>);
};
