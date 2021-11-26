import classes from '../Calendar.module.scss'
import { Avatar, IconButton, MenuItem, Typography } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useState } from 'react';

function UserMenuItem(props) {

    const [demoMode, setDemoMode] = useState(true);

    function onUserSelectHandle() {
        props.onSelectUser(props.user);
    }

    //demo mode only
    function onSwitchCurrentUserHandle() {
        props.onSwitchCurrentUser(props.user);
    }

    return (
        <MenuItem className={classes["menu_user__item"]} key={props.userId} onClick={onUserSelectHandle}>
            <Avatar src={props.user.avatar} />
            <Typography className={classes["item__text"]}>
                {props.user.fullName}
            </Typography>
            {
                demoMode ?
                    (<IconButton onClick={onSwitchCurrentUserHandle}>
                        <SwapHorizIcon />
                    </IconButton>)
                    : null
            }

        </MenuItem>
    )
}

export default UserMenuItem;