import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Charity } from "../types/types";

export const Favorite = () => {
    const [results, setResults] = useState<Charity[]>([]);

    useEffect(() => {
        loadFaveStorage();
    },[]);

    const loadFaveStorage = () => {
        const jsonArrayString = localStorage.getItem(import.meta.env.VITE_FAVE_KEY);
        const jsonArray = JSON.parse(jsonArrayString || '[]');
        setResults(jsonArray);
    };
    
    return (<>
            {(results === null || results.length === 0 ? <div><h1>No current favorites</h1></div> : 
            <div>
                <ul className="columns-3">
                {results?.map((data)=> 
                <div>
                    { (data.logoUrl !== undefined && data.logoUrl !== '' ?
                        <img src={data.logoUrl}></img> : 
                        <img src="../GenericIcon.png" width="48" height="48"/> )}
                    <Link to={"/charity/"+data.ein}>{data.name}</Link>
                    <p>{data.location}</p>
                </div>
                )}
          </ul>
          </div>)}
          </>);
  };