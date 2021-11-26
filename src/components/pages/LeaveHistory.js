import classes from './LeaveHistory.module.scss';
import clsx from 'clsx';
import { DataGrid } from '@mui/x-data-grid';
import { Card, Box, Grid, CardContent, Typography, Button, Stack, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    dataGridCustom: {
        '& .cell': {
            color: '#1a3e72',
            fontWeight: '600',
            align: "center"
        }, '& .cell.success': {
            color: '#34c38f',
            fontWeight: '600'
        }, '& .cell.danger': {
            color: '#f46a6a',
            fontWeight: '600'
        }, '& .cell.warning': {
            color: '#f1b44c',
            fontWeight: '600'
        }, '& .MuiDataGrid-columnHeaderWrapper': {
            backgroundColor: "#EFF2F7"
        }, '& .MuiDataGrid-window': {
            backgroundColor: 'white'
        }
    },
});


const DUMMY_DATA = [
    {
        "id": 1,
        "numberOrder": 1,
        "leaveType": "Annual Leave",
        "startTime": "2021/01/08 08:00 AM",
        "endTime": "2021/01/08 17:00 AM",
        "hours": 8,
        "status": "Approved",
        "reason": "I have private work"
    },
    {
        "id": 2,
        "numberOrder": 2,
        "leaveType": "Annual Leave",
        "startTime": "2021/02/08 08:00 AM",
        "endTime": "2021/02/08 17:00 AM",
        "hours": 8,
        "status": "Pending",
        "reason": "I have private work"
    },
    {
        "id": 3,
        "numberOrder": 3,
        "leaveType": "Summer Leave",
        "startTime": "2021/03/08 08:00 AM",
        "endTime": "2021/03/08 17:00 AM",
        "hours": 8,
        "status": "Approved",
        "reason": "Today is rainy day, I don't feel too good to go to work"
    },
    {
        "id": 4,
        "numberOrder": 4,
        "leaveType": "Annual Leave",
        "startTime": "2021/03/16 08:00 AM",
        "endTime": "2021/03/16 17:00 AM",
        "hours": 8,
        "status": "Rejected",
        "reason": "Today is rainy day, I don't feel too good to go to work"
    },
    {
        "id": 5,
        "numberOrder": 5,
        "leaveType": "Annual Leave",
        "startTime": "2021/04/22 08:00 AM",
        "endTime": "2021/04/22 17:00 AM",
        "hours": 8,
        "status": "Approved",
        "reason": "Today is rainy day, I don't feel too good to go to work"
    },
    {
        "id": 6,
        "numberOrder": 6,
        "leaveType": "Annual Leave",
        "startTime": "2021/06/20 08:00 AM",
        "endTime": "2021/06/20 17:00 AM",
        "hours": 8,
        "status": "Approved",
        "reason": "Today is rainy day, I don't feel too good to go to work"
    },
    {
        "id": 7,
        "numberOrder": 7,
        "leaveType": "Summer Leave",
        "startTime": "2022/06/30 08:00 AM",
        "endTime": "2022/06/30 17:00 AM",
        "hours": 8,
        "status": "Pending",
        "reason": "Today is rainy day, I don't feel too good to go to work"
    }
];

function LeaveHistory() {

    const styles = useStyles();

    const columns = [
        {
            field: 'numberOrder',
            headerName: 'No.',
            type: 'number',
            width: 100,
            headerAlign: 'center',
        },
        {
            field: 'leaveType',
            headerName: 'Leave Type',
            width: 150,
            headerAlign: 'center'
        },
        {
            field: 'startTime',
            headerName: 'Start Time',
            width: 200,
            headerAlign: 'center'
        },
        {
            field: 'endTime',
            headerName: 'End Time',
            width: 200,
            headerAlign: 'center'
        },
        {
            field: 'hours',
            headerName: 'Hours',
            type: 'number',
            width: 130,
            headerAlign: 'center'
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            headerAlign: 'center',
            cellClassName: (params) =>
                clsx('cell', {
                    success: params.value === "Approved",
                    danger: params.value === "Rejected",
                    warning: params.value === "Pending"
                })
        },
        {
            field: 'reason',
            headerName: 'Reason',
            width: 714,
            headerAlign: 'center'
        }
    ]

    return (
        <div className="main-content">
            <Grid container spacing={2}>
                <Grid item lg={4}>
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
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <Box component="div" className={classes['section__wrap']}>
                        <Box className={[classes['section__line'], classes['--space-between']]}>
                            <Button variant="contained" className={`button --success`} startIcon={<AddIcon />} component={Link} to='/leaveform' >
                                New Request
                            </Button>
                            <Button variant="contained" className="button --info" startIcon={<PictureAsPdfIcon />}>Export as PDF</Button>
                        </Box>
                        <Box className={classes['section__line']}>
                            <Stack direction="row" spacing={1}>
                                <IconButton aria-label="previous">
                                    <NavigateBeforeIcon sx={{ fontSize: "40px" }} />
                                </IconButton>
                                <Typography variant="h4" className={classes['--align-items-center']} sx={{ color: '#74788d' }}>2021 YEAR</Typography>
                                <IconButton aria-label="previous">
                                    <NavigateNextIcon sx={{ fontSize: "40px" }} />
                                </IconButton>
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box style={{ height: 370, width: '100%' }} >
                <DataGrid className={styles.dataGridCustom}
                    rows={DUMMY_DATA}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    showCellRightBorder={'true'}
                />
            </Box>
        </div >
    );
}

export default LeaveHistory;