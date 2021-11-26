import classes from '../Calendar.module.scss';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react';

function NoteForm(props) {
    let tempNoteCalendar = props.note;

    const [noteCalendar, setNoteCalendar] = useState(tempNoteCalendar)

    const checkBoxHandle = () => {
        setNoteCalendar({ ...noteCalendar, isPublic: !noteCalendar.isPublic })
        tempNoteCalendar.isPublic = !tempNoteCalendar.isPublic;
    }

    const colorChangeHandle = (event) => {
        setNoteCalendar({ ...noteCalendar, color: event.target.value })
        tempNoteCalendar.color = event.target.value;
    }

    const setValueChange = useCallback(() => {
        setNoteCalendar({ ...tempNoteCalendar })
    }, [tempNoteCalendar])

    const saveFormHandle = () => {
        props.onSaveNote(noteCalendar);
        props.onClose();
    }

    useEffect(() => {
        setValueChange();
    }, [setValueChange])

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
                    value={tempNoteCalendar ? tempNoteCalendar.content : ""}
                    rows={5}

                />
                <FormGroup className={classes["note-form__group"]}>
                    <FormLabel component="legend" className={classes["group__label"]}>Privacy</FormLabel>
                    <Stack direction="row" spacing={2}>
                        <FormControlLabel control={<Checkbox checked={tempNoteCalendar ? (tempNoteCalendar.isPublic ? true : false) : true} />} onClick={checkBoxHandle} label="Public" />
                        <FormControlLabel control={<Checkbox checked={tempNoteCalendar ? (tempNoteCalendar.isPublic ? false : true) : false} />} onClick={checkBoxHandle} label="Private" />
                    </Stack>
                </FormGroup>
                <FormControl className={classes["note-form__group"]}>
                    <FormLabel component="legend" className={classes["group__label"]}>Color</FormLabel>
                    <Select
                        value={tempNoteCalendar ? tempNoteCalendar.color : ""}
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
            </DialogContent>
            <DialogActions>
                <Button sx={{ color: "white" }} className={`button --success`} onClick={saveFormHandle}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NoteForm;