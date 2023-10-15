import { SearchBarProp } from '../types/types';
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

export const Navigation = (props: SearchBarProp) => {
    const style = {
      display: 'flex',
      width: '100vw',
      backgroundColor: '#f3f4f6',
      padding: '20px',
      gap: '20px',
      height: '75px',
    } as React.CSSProperties;

    const [input, setInput] = useState('');

    const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event);
        setInput(event.target.value);
    }

    const onClickClear = () => {
      setInput('');
  }

    return (
      <>
        <div style={style}>
          <Link onClick={onClickClear} to="/">HOME</Link>
          <input className="display:block mt-auto"onChange={(event)=>onChangeInput(event)}></input>
          { input.trim() === "" ? null : 
          (<div id="navbar-dropdown" className="w-full md:block md:w-auto flex flex-col">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="searchFilterDropDown">
            {props.filterData.map((data)=> <Link onClick={onClickClear} to={"/searchCharity/"+data} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{data}</Link>)}
          </ul>
          </div>
          )}
          <Link onClick={onClickClear} to="/Favorites">Favorites</Link>
        </div>
        <Outlet />
      </>
    );
  };
  