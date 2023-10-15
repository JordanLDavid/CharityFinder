import { useEffect, useState } from "react";
import { CharityDetails, CharityDetailsResponse } from "../types/types";
import axios from "axios";
import { useParams } from "react-router-dom";

export const CharityDetail = () => {
    const [results, setSearchResults] = useState<CharityDetails>();
    const [isFavorite, setFavorite] = useState(false);
    
    const { id } = useParams();

    useEffect(() => {
        if (id !== undefined) 
        {
            LookInStorage(id)
        }
        const apiKey = import.meta.env.VITE_API_KEY;
        axios.get<CharityDetailsResponse>("https://partners.every.org/v0.2/nonprofit/"+id+"?apiKey="+apiKey)
        .then(response => {
            const charity = response.data;
            setSearchResults(charity.data.nonprofit);
        })
      },[]);

      const onClickFavorite = () => {
        UpdateStorage();
        setFavorite(!isFavorite);        
      }

      const LookInStorage = (id:string) => {
        const jsonArrayString = localStorage.getItem(import.meta.env.VITE_FAVE_KEY);
        const jsonArray = JSON.parse(jsonArrayString || '[]');
        const isObjectExisting = jsonArray.some((item) => item.ein === id);
        
        if (isObjectExisting) {
            setFavorite(true);
        }
      }
      const UpdateStorage = () => {
        if (results === undefined || results === null)
        {
            return;
        }
        const jsonArrayString = localStorage.getItem(import.meta.env.VITE_FAVE_KEY);
        const jsonArray = JSON.parse(jsonArrayString || '[]');
        const isObjectExisting = jsonArray.some((item) => JSON.stringify(item) === JSON.stringify(results));
        
        if (isObjectExisting) {
          const updatedArray = jsonArray.filter((item) => JSON.stringify(item) !== JSON.stringify(results));
          localStorage.setItem(import.meta.env.VITE_FAVE_KEY, JSON.stringify(updatedArray));
        } else {
          jsonArray.push(results);
          localStorage.setItem(import.meta.env.VITE_FAVE_KEY, JSON.stringify(jsonArray));
        }
      }
    return (<>
            {( results === undefined ? <div> Charity not found </div> :
            <div className="flex">                
                <div className="flow-left w-4/5 pt-2">
                    <img className="object-cover h-48 w-96" src={results.coverImageUrl}/>
                    { (results.logoUrl !== undefined && results.logoUrl !== '' ?
                        <img src={results.logoUrl}></img> : 
                        <img src="../GenericIcon.png" width="48" height="48"/> )}
                    <h1>{results.name}</h1>
                    <h2>{results.location}</h2>
                    <p> {results.description}</p> <br/>
                    <p className="text-sm"> {results.descriptionLong}</p>
                </div>
                <div className="flow-right w-auto pt-10">
                    <button onClick={onClickFavorite}> {isFavorite ? "Remove from Favorites" : "Add to Favorite"}</button>
                </div>
          </div>)}
          </>);
  };
  