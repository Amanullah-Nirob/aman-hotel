import React,{useRef,useState,useEffect} from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import { useDebounce } from '../../utils/appUtils';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import SearchView from './SearchView';

const Search = () => {
    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [searchResult, setSearchResult] = useState<any | null>(null);
    const theme=useAppSelector(selectTheme)
    const [isSearch, setIsSearch] = useState(false);
    const debouncedSearchTerm = useDebounce(keyword, 300);
    const [loading, setLoading] = useState(false);

// search area =========================================
        useEffect(() => {
            if (debouncedSearchTerm) {
                setLoading(true);
                if (keyword) {
                    console.log(keyword);
                    
                    fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/room/search?search=${keyword}`)
                    .then(res=>res.json())
                    .then(data=>{
                        if(data){
                            console.log(data);
                            
                            setLoading(false);
                            setSearchResult(data);
                            setIsSearch(true);
                        }
                    })   
                } else {
                    setIsSearch(false);
                    setKeyword('');
                }
                if (loading) {
                    setIsSearch(false);
                }
            } else {
                setLoading(false);
                setIsSearch(false);
            }
        }, [debouncedSearchTerm]);
        
        
        function handleClearKeyword() {
            setKeyword('');
            setIsSearch(false);
            setLoading(false);
        }

// show element
  let roomsItemsView,
  clearTextView,
  loadingView
  if (!loading) {
    if (searchResult && searchResult.length > 0) {
        roomsItemsView = searchResult.map((room:any) => (
            <SearchView
             room={room}
             key={room._id} />
        ));
    } else {
        roomsItemsView = <p>No User found.</p>;
    }
    if (keyword !== '') {
        clearTextView = (
            <span className="form-action" onClick={handleClearKeyword}>
             <CloseIcon sx={{color:theme==='light'?'#222':'#eee'}} />
            </span>
        );
    }
} else {
  loadingView = (
      <span className="form-action spin">
         <CircularProgress size="18px" />
      </span>
  );
}

    return (
        <div>
        <form className="search-area-main">
            <div className="search-input">    
            <input
                    ref={inputEl}
                    type="text"
                    value={keyword}
                    placeholder='Search room number' style={{backgroundColor:theme==='light'?'#fff':'rgb(56 56 56 / 64%)',color:theme==='light'?'#000':'#fff',borderColor:theme==='light'?'#f5f5f6':'#333'}}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {clearTextView}
                {loadingView}
            </div>

            <div className={`search-result${ isSearch ? ' active ' : ''}`}
             style={{
             backgroundColor:theme==='light'?'#fff':'#242526',
             boxShadow:theme==='light'?'rgb(0 0 0 / 16%) 1px 5px 9px':'rgb(0 0 0 / 16%) 1px 5px 9pxx'
             }}>

                <div className="userListMain">{roomsItemsView}</div>

            </div>
        </form>
        </div>
    );
};

export default Search;