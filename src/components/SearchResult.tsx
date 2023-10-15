import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CharityResponse } from "../types/types";

export const SearchResult = () => {
    const [results, setSearchResults] = useState<CharityResponse>();
    
    const { cause } = useParams();

    useEffect(() => {
        const apiKey = import.meta.env.VITE_API_KEY;
        axios.get<CharityResponse>("https://partners.every.org/v0.2/search/"+cause+"?apiKey="+apiKey)
        .then(response => {
          setSearchResults(response.data);
        })},[]);

    return (<>
            <div>
                <ul className="columns-3">
                {results?.nonprofits.map((data)=> 
                <div>
                    { (data.logoUrl !== undefined && data.logoUrl !== '' ?
                        <img src={data.logoUrl}></img> : 
                        <img src="../GenericIcon.png" width="48" height="48"/> )}
                    <Link to={"/charity/"+data.ein}>{data.name}</Link>
                    <p>{data.location}</p>
                </div>
                )}
          </ul>
          </div>
          </>);
  };
  