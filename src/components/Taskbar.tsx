import { SearchBarProp } from '../types/types';
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

export const Navigation = (props: SearchBarProp) => {
    const style = {
      width: '100vw',
      backgroundColor: '#f3f4f6',
      padding: '20px',
      height: '60px',
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
        <nav style={style}>
          <div className="container mx-auto items-start justify-left md:flex md:flex-wrap">
          <div className="mr-4"> <Link onClick={onClickClear} to="/">HOME</Link></div>
          <div className="relative flex-grow">
            <input className="w-full h-full max-w-md" onChange={(event)=>onChangeInput(event)}></input>
            { input.trim() === "" ? null : 
            (<div className="bg-white grid grid-cols-3 gap-2 p-2 justify-left items-start max-h-48 overflow-y-auto w-full max-w-md">
              {props.filterData.length === 0 ? <p>No causes found</p> :
               props.filterData.map((data)=> <div key={data} >
                                                 <Link onClick={onClickClear} to={"/searchCharity/"+data} 
                                                 className="dark:hover:bg-gray-600 dark:hover:text-white">{data}</Link></div>)}

              </div>
            )}
          </div>
          <div className="items-center flex ml-4">
            <Link onClick={onClickClear} to="/Favorites">Favorites</Link>
          </div>
          </div>
        </nav>
        <Outlet />
      </>
    );
  };
  