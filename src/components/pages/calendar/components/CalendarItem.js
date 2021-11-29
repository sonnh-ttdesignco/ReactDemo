import classes from '../Calendar.module.scss';
import { IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';

function CalendarItem(props) {

    const [privacy, setPrivacy] = useState(props.calendarItem.isPublic);

    const onClickPrivacyHandle = () => {
        setPrivacy(!props.calendarItem.isPublic);
        props.onChangePrivacy(props.calendarItem.calendarId);
    }

    const onOpenNoteHandle = () => {
        props.onOpenNoteForm(props.calendarItem.calendarId);
    }

    useEffect(() => {
        setPrivacy(props.calendarItem.isPublic);
    }, [props.calendarItem.isPublic])

    return (
        <div className={`${classes["calendar-item"]} ${classes["calendar-item--" + props.calendarItem.color]}`}>
            <div className={classes["calendar-item__text"]}>
                {props.calendarItem.content}
            </div>
            {
                props.currentUser === props.calendarItem.userId ?
                    (
                        <>
                            <IconButton className={`${classes["calendar-item__button"]}`} onClick={onClickPrivacyHandle}>
                                {privacy ? (<VisibilityOffIcon className={`${classes["button__icon"]}`} />)
                                    : (<VisibilityIcon className={`${classes["button__icon"]}`} />)
                                }

                            </IconButton>
                            <IconButton className={`${classes["calendar-item__button"]}`} onClick={onOpenNoteHandle}>
                                <EditIcon className={`${classes["button__icon"]}`} />
                            </IconButton>
                        </>
                    ) : null
            }

        </div >
    )
}

export default CalendarItem;