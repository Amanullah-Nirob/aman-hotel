import React from 'react';
import Menu from '../../utils/Menu';
import { ListItemIcon, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const ReviewAction = ({openReviewAction,setOpenReviewAction,handleClickEditReview,handleDeleteReview,isAuthorOrAdmin,isAuthor,review}:any) => {
    return (
      <Menu
        menuAnchor={openReviewAction}
        setMenuAnchor={setOpenReviewAction}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isAuthor && (
          <MenuItem onClick={handleClickEditReview}>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <span>Edit Review</span>
        </MenuItem>
        )}
        {isAuthorOrAdmin &&(
          <MenuItem onClick={()=>handleDeleteReview(review._id,review?.roomId)}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <span>Delete Review</span>
        </MenuItem>
        )}
      </Menu> 
    );
};

export default ReviewAction;