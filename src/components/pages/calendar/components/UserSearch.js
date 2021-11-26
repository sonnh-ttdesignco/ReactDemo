import classes from '../Calendar.module.scss'

import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function UserSearch(props) {

    let onChangeHandle = (event) => {
        props.onSearchInputChange(event.target.value);
    }

    return (
        <Box className={classes["menu_user__search"]}>
            <TextField className={classes["search__input"]}
                placeholder="Search someone..."
                variant="standard"
                onChange={onChangeHandle}
            />
            <SearchIcon className={classes["search__icon"]} />
        </Box>
    )
}

export default UserSearch;