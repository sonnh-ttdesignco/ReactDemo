import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Grid, Card, CardContent, Typography, Box, FormControl, TextField, MenuItem, Stack } from "@mui/material";
import classes from './LeaveForm.module.scss'
import React from 'react';
import { TimePicker } from '@mui/lab';

const leaveType = [
    {
        value: 'Annual Leave',
    },
    {
        value: 'Summer Leave',
    },
];

const mailList = [
    {
        value: 'admin@ttdesignco.com'
    },
    {
        value: 'abcd123@ttdesignco.com'
    },
    {
        value: 'xyz456@ttdesignco.com'
    },
]

function LeaveForm() {

    const [startDate, setStartDate] = React.useState(new Date());
    const [startTime, setStartTime] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [endTime, setEndTime] = React.useState(new Date());

    return (
        <div className="main-content">
            <Grid container spacing={2} >
                <Grid item lg={5}>
                    <Card className={classes['card']}>
                        <CardContent sx={{
                            height: 153,
                            display: 'flex'
                        }}>
                            <span className={classes['card__line']}>
                            </span>
                            <CardContent className={classes['card__body']}>
                                <Typography variant='h6' className={`${classes['card__title']}`}>REST OF LEAVE DAYS</Typography>
                                <div className={classes['card-content__wrap']}>
                                    <Box className={classes['card__content']}>
                                        <div className={classes['card__text']}>
                                            <Typography variant='h1' className={`${classes['card-text__line']} color--warning
                                            ${classes['--line-height-0-75']} ${classes['--flex-left']}`}>08</Typography>
                                        </div>
                                    </Box>
                                    <Box className={[classes['card__content']]}>
                                        <div className={classes['card__text']}>
                                            <Typography variant='body1' className={`${classes['card-text__line']} ${classes['--flex-right']}`}>Annual Leaves: 08 Days</Typography>
                                            <Typography variant='body1' className={`${classes['card-text__line']} ${classes['--flex-right']}`}>Summer Leaves: 00 Days</Typography>
                                        </div>
                                    </Box>
                                </div>
                            </CardContent>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={12} sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}>
                    <Card className={classes['card']}>
                        <CardContent>
                            <Grid item lg={5}>
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Leave type"
                                    >
                                        {leaveType.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                                <FormControl fullWidth >
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        label="Reason to leave"
                                        multiline
                                        rows={4}
                                    />
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack direction="row">
                                        <DatePicker
                                            label="Start date"
                                            value={startDate}
                                            onChange={(newValue) => {
                                                setStartDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        <TimePicker
                                            label="Start time"
                                            value={startTime}
                                            onChange={(newValue) => {
                                                setStartTime(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                    <Stack direction="row">
                                        <DatePicker
                                            label="End date"
                                            value={endDate}
                                            onChange={(newValue) => {
                                                setEndDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        <TimePicker
                                            label="End time"
                                            value={endTime}
                                            onChange={(newValue) => {
                                                setEndTime(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <FormControl fullWidth>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Forward to"
                                    >
                                        {mailList.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div >
    );
}

export default LeaveForm;