import React,{useRef,useState,useEffect} from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import { useDebounce } from '../../utils/appUtils';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import SearchView from './SearchView';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';


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
                           setLoading(false);
                            setSearchResult(data);
                            setIsSearch(true);
                        }
                    }).catch((error)=>{
                        console.log(error);
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
        roomsItemsView = <p>Room Not Found</p>;
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
const handleBlur=()=>{
    setIsSearch(false);
}
const handleFocus=()=>{
    if(searchResult && searchResult.length > 0){
        setIsSearch(true);
    }
}


    return (
        <Box className='searchRoom' sx={{width:{lg:'37vh'}}}>
        <form className="search-area-main">
            <div className="search-input">  
            <div className="searchIcon">
            <SearchIcon />
            </div>  
            <input
                    ref={inputEl}
                    type="text"
                    value={keyword}
                    placeholder='Search room number' style={{backgroundColor:theme==='light'?'#fff':'rgb(56 56 56 / 64%)',color:theme==='light'?'#000':'#fff',borderColor:theme==='light'?'rgb(228 228 231)':'#333'}}
                    onChange={(e) => setKeyword(e.target.value)}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
                {clearTextView}
                {loadingView}
            </div>

            <div className={`search-result${isSearch ? ' active ' : ''}`}
             style={{
             backgroundColor:theme==='light'?'#fff':'#242526',
             boxShadow:theme==='light'?'rgb(0 0 0 / 16%) 1px 5px 9px':'rgb(0 0 0 / 16%) 1px 5px 9pxx'
             }}>
                <div className="roomListMain">
                    {roomsItemsView}
                </div>

            </div>
        </form>
        </Box>
    );
};

export default Search;