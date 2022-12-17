import React,{useRef,useState,useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import { useDebounce } from '../../utils/appUtils';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import SearchView from './SearchView';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Paper,useMediaQuery,Divider} from '@mui/material';
import { removeAllHistory, selectRecentHistorySearch } from '../../app/slices/RecentHistorySearch';


const Search = ({open,setOpen}:any) => {
    const inputEl = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [searchResult, setSearchResult] = useState<any | null>(null);
    const theme=useAppSelector(selectTheme)
    const [isSearch, setIsSearch] = useState(false);
    const debouncedSearchTerm = useDebounce(keyword, 100);
    const [loading, setLoading] = useState(false);
    const [isFocus,setIsFocus]=useState(false)
    const mediaMobile=useMediaQuery('(max-width:600px)')
    const recentHistory=useAppSelector(selectRecentHistorySearch)
    const dispatch=useAppDispatch()
    
    function handleClearKeyword() {
        setKeyword('');
        setSearchResult(null)
        setIsSearch(false);
        setLoading(false);
      
    }

// search area =========================================
        useEffect(() => {
            if (debouncedSearchTerm) {
                setLoading(true);
                if (keyword) {             
                   fetch(`${process.env.NEXT_PUBLIC_APIURL}/room/search?search=${keyword}`)
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
                    setSearchResult(null)
                    setIsSearch(false);
                    setKeyword('');
                }
                if (loading) {
                    setIsSearch(false);
                }
            } else {
                setSearchResult(null)
                setLoading(false);
                setIsSearch(false);
            }
        }, [debouncedSearchTerm]);
        
        const handleHistoryBlur=()=>{

        }

// show element
  let roomsItemsView,
  clearTextView,
  loadingView,
  resentHistory
  if (!loading) {
    if (searchResult && searchResult.length > 0) {
        roomsItemsView = searchResult.map((room:any) => (
            <SearchView 
            isMobileOpenTrue={open}
            setIsMobileSet={setOpen}
            isFocus={isFocus}
             room={room}
             key={room._id} />
        ));
    } else {
       keyword !=='' && (roomsItemsView = <p>Room Not Found</p>)
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

if((mediaMobile || isFocus && !isSearch && recentHistory.length >0)){
    if(recentHistory && recentHistory.length >0){
        resentHistory= (
            <Paper sx={{
                maxHeight:mediaMobile?'100%':'56vh',
                backgroundImage:open?'none':'',
                overflowY:'scroll',
                overflow:"auto",
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  background: theme==='light'?"#ddd":'#333',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: theme==='light'?'#888':'#ddd',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555'
                }

                }}>
              <div className='historySearch_Title'>
                <h4>Recent Search</h4>
                <p onClick={()=>dispatch(removeAllHistory([]))}>Clear all</p>
              </div>
            {recentHistory.map((historyItem:any)=>(
                <SearchView 
                isMobileOpenTrue={open}
                setIsMobileSet={setOpen}
                searchHistory={true}
                key={historyItem._id} 
                room={historyItem}/>
            ))}
            </Paper>
           
        )
    }else{
        resentHistory= <p style={{textAlign:'center'}}> No Recent History</p>
    }
  
}


const handleBlur=()=>{
    setIsSearch(false);
    isFocus&&  setTimeout(() => {
        setIsFocus(false)
    }, 100);
}
const handleFocus=()=>{
    if(searchResult && searchResult.length > 0 ){
        setIsSearch(true);
    }
    setIsFocus(true)
}


    return (
        <Box className='searchRoom' sx={{width:{lg:'37vh'}}}>
        <form className="search-area-main">
            <div className="search-input">  
            <div className="searchIcon">
            <SearchIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848'}} />
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
              {mediaMobile && <Divider />}
                <div className="roomListMain">
                    {roomsItemsView}
                </div>
            </div>
           {!isSearch && (
             <div className='search-history'>
                  {resentHistory}
             </div>
           )}
            
        </form>
        </Box>
    );
};

export default Search;