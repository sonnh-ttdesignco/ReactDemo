import classes from '../Calendar.module.scss';
import { Autocomplete, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, MenuItem, Paper, Select, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';

function NoteForm(props) {
    let tempNoteCalendar = ({
        calendarId: props.calendarId,
        date: props.date,
        userId: props.userId,
        content: props.content,
        color: props.color,
        isPublic: props.isPublic,
        assignTo: props.assignTo
    })

    const [noteCalendar, setNoteCalendar] = useState({
        calendarId: props.calendarId,
        date: props.date,
        userId: props.userId,
        content: props.content,
        color: props.color,
        isPublic: props.isPublic,
        assignTo: props.assignTo
    })

    const [userSelected, setUserSelected] = useState(props.assignTo);

    const checkBoxHandle = () => {
        tempNoteCalendar.isPublic = !noteCalendar.isPublic;
        setNoteCalendar({ ...noteCalendar, isPublic: !noteCalendar.isPublic })
    }

    const colorChangeHandle = (event) => {
        setNoteCalendar({ ...noteCalendar, color: event.target.value })
        tempNoteCalendar.color = event.target.value;
    }

    const contentChangeHandle = (event) => {
        setNoteCalendar({ ...noteCalendar, content: event.target.value })
        tempNoteCalendar.content = event.target.value;
    }

    const userSelectHandle = (event, values) => {
        console.log('change', values)
        setUserSelected(values);
    }

    const saveFormHandle = () => {
        props.onSaveNote(noteCalendar, userSelected);
        props.onClose();
    }

    useEffect(() => {
        if (noteCalendar !== tempNoteCalendar) {
            setNoteCalendar({
                calendarId: tempNoteCalendar.calendarId,
                date: props.date,
                userId: tempNoteCalendar.userId,
                content: tempNoteCalendar.content,
                color: tempNoteCalendar.color,
                isPublic: tempNoteCalendar.isPublic,
                assignTo: userSelected
            });
        }
        return (() => {
            setUserSelected([]);
            setNoteCalendar({
                calendarId: props.calendarId,
                date: props.date,
                userId: props.userId,
                content: props.content,
                color: props.color,
                isPublic: props.isPublic,
                assignTo: props.assignTo
            });
        })
    }, [props])

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Note</DialogTitle>
            <DialogContent className={classes["note-form__container"]}>
                <TextField className={classes["note-form__input"]}
                    autoFocus
                    id="noteContent"
                    placeholder="Note something here..."
                    fullWidth
                    variant="outlined"
                    multiline
                    value={noteCalendar ? (noteCalendar.content ? noteCalendar.content : "") : ""}
                    rows={5}
                    onChange={contentChangeHandle}
                />
                <FormGroup className={classes["note-form__group"]}>
                    <FormLabel component="legend" className={classes["group__label"]}>Privacy</FormLabel>
                    <Stack direction="row" spacing={2}>
                        <FormControlLabel control={<Checkbox checked={noteCalendar ? (noteCalendar.isPublic ? true : false) : true} />} onClick={checkBoxHandle} label="Public" />
                        <FormControlLabel control={<Checkbox checked={noteCalendar ? (noteCalendar.isPublic ? false : true) : false} />} onClick={checkBoxHandle} label="Private" />
                    </Stack>
                </FormGroup>
                <FormControl className={classes["note-form__group"]}>
                    <FormLabel component="legend" className={classes["group__label"]}>Color</FormLabel>
                    <Select
                        value={noteCalendar ? noteCalendar.color : ""}
                        onChange={colorChangeHandle}
                    >
                        <MenuItem value={"success"}>
                            <div className={classes["group__selection"]}>
                                <div className={`${classes["icon"]} ${classes["icon--success"]}`} ></div>Success
                            </div>
                        </MenuItem>
                        <MenuItem value={"danger"}>
                            <div className={classes["group__selection"]}>
                                <div className={`${classes["icon"]} ${classes["icon--danger"]}`} ></div>Danger
                            </div>
                        </MenuItem>
                        <MenuItem value={"warning"}>
                            <div className={classes["group__selection"]}>
                                <div className={`${classes["icon"]} ${classes["icon--warning"]}`} ></div>Warning
                            </div>
                        </MenuItem>
                        <MenuItem value={"info"}>
                            <div className={classes["group__selection"]}>
                                <div className={`${classes["icon"]} ${classes["icon--info"]}`} ></div>Info
                            </div>
                        </MenuItem>
                    </Select>
                </FormControl>

                <div component="legend" className={classes["note-form__label"]}>Assign</div>
                <Autocomplete className={classes["note-form__group"]}
                    disabled={props.isAdmin ? false : true}
                    multiple
                    options={props.userList.map((option) => option.fullName)}
                    defaultValue={props.assignTo}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    onChange={userSelectHandle}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                        />
                    )}
                />
            </DialogContent>
            <DialogActions sx={{ padding: "16px" }}>
                <Button startIcon={<SaveIcon />} sx={{ color: "white" }} className={`button --success`} onClick={saveFormHandle}>Save</Button>
            </DialogActions>
        </Dialog >
    )
}

export default NoteForm;