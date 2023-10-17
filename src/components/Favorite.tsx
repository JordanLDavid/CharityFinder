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
            <ul className="m-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {results?.map((data)=> 
            <div className="border border-solid border-gray-300 p-2 grid grid-rows-2">
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
            )}
          </>);
  };