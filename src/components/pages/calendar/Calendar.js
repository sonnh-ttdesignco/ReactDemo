import classes from './Calendar.module.scss';
import { Card, CardContent, Grid, IconButton, Stack, Paper, Box, Avatar, MenuList } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarItem from './components/CalendarItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { addDays, addMonths, eachDayOfInterval, eachWeekOfInterval, endOfMonth, format, getDay, getWeek, startOfMonth, subDays, subMonths } from 'date-fns'
import _ from 'lodash';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CalendarPicker, LocalizationProvider } from '@mui/lab';
import UserMenuItem from './components/UserMenuItem';
import UserSearch from './components/UserSearch';
import NoteForm from './components/NoteForm';
// import any from './../../../assets/JohnWick.jpg'

const DUMMY_CALENDAR_DATA = [
    {
        calendarId: "C001",
        date: "2021/11/05",
        userId: "U001",
        content: "Test data thật là dàiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
        color: "success",
        isPublic: true,
        assignTo: ['asdas', 'asdasd']
    },
    {
        calendarId: "C002",
        date: "2021/11/05",
        userId: "U001",
        content: "Test data",
        color: "info",
        isPublic: false,
        assignTo: []
    },
    {
        calendarId: "C003",
        date: "2021/11/05",
        userId: "U001",
        content: "Test data",
        color: "info",
        isPublic: true,
        assignTo: []
    },
    {
        calendarId: "C004",
        date: "2021/11/05",
        userId: "U001",
        content: "Test data",
        color: "warning",
        isPublic: true,
        assignTo: []
    },
    {
        calendarId: "C005",
        date: "2021/11/05",
        userId: "U001",
        content: "Test data",
        color: "danger",
        isPublic: true,
        assignTo: []
    },
    {
        calendarId: "C006",
        date: "2021/11/11",
        userId: "U001",
        content: "Test data",
        color: "danger",
        isPublic: true,
        assignTo: []
    },
    {
        calendarId: "C007",
        date: "2021/11/15",
        userId: "U001",
        content: "Test data",
        color: "info",
        isPublic: true,
        assignTo: []
    },
    {
        calendarId: "C008",
        date: "2021/11/20",
        userId: "U001",
        content: "Test data",
        color: "warning",
        isPublic: true,
        assignTo: []
    },
    {
        calendarId: "C009",
        date: "2021/11/20",
        userId: "U002",
        content: "Test data",
        color: "warning",
        isPublic: false,
        assignTo: []
    },
    {
        calendarId: "C010",
        date: "2021/11/20",
        userId: "U002",
        content: "Test data",
        color: "success",
        isPublic: true,
        assignTo: []
    },
    {
        calendarId: "C011",
        date: "2021/12/20",
        userId: "U001",
        content: "Test data",
        color: "success",
        isPublic: true,
        assignTo: []
    },
    {
        calendarId: "C012",
        date: "2021/12/20",
        userId: "U001",
        content: "Test data",
        color: "danger",
        isPublic: true,
        assignTo: []
    },
    {
        calendarId: "C013",
        date: "2021/12/20",
        userId: "U002",
        content: "Test data",
        color: "info",
        isPublic: true,
        assignTo: []
    },
    {
        calendarId: "C014",
        date: "2021/12/01",
        userId: "U002",
        content: "Test data",
        color: "danger",
        isPublic: true,
        assignTo: []
    },
    {
        calendarId: "C015",
        date: "2021/12/20",
        userId: "U003",
        content: "Test data",
        color: "info",
        isPublic: true,
        assignTo: []
    },
    {
        calendarId: "C016",
        date: "2021/12/22",
        userId: "U003",
        content: "Test data",
        color: "info",
        isPublic: true,
        assignTo: []
    },
    {
        calendarId: "C017",
        date: "2021/11/22",
        userId: "U003",
        content: "Test data",
        color: "success",
        isPublic: true,
        assignTo: []
    },
]

const DUMMY_USER_DATA = [
    {
        userId: "U001",
        userName: "JohnWick",
        avatar: "https://media-cdn.laodong.vn/Storage/NewsPortal/2021/3/26/892912/John-Wick-Phan-4.jpg",
        fullName: "Mr John 'Baba Yaga' Wick",
        isAdmin: true
    },
    {
        userId: "U002",
        userName: "ThorOdinson",
        avatar: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/14/1522871998-aif13.jpg?resize=480:*",
        fullName: "Thor Odinson",
        isAdmin: false
    },
    {
        userId: "U003",
        userName: "EddieBrock",
        avatar: "https://s31242.pcdn.co/wp-content/uploads/2021/09/Screenshot-2021-09-28-at-15.46.22.jpg",
        fullName: "Eddie Brock x Venom",
        isAdmin: false
    },
    {
        userId: "U004",
        userName: "DaenerysTargaryen",
        avatar: "https://pbs.twimg.com/profile_images/1220044684791308288/xGeuSMdZ.jpg",
        fullName: "Daenerys Targaryen",
        isAdmin: false
    },
    {
        userId: "U005",
        userName: "ThomasShelby",
        avatar: "https://static-koimoi.akamaized.net/wp-content/new-galleries/2020/10/peaky-blinders-do-you-know-cillian-murphy-as-thomas-shelby-smoked-3000-cigarettes-in-just-2-seasons-002.jpg",
        fullName: "Thomas Shelby",
        isAdmin: false
    },
    {
        userId: "U006",
        userName: "JonSnow",
        avatar: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kit-harington-hair-jon-snow-1569167827.jpg?crop=0.439xw:0.878xh;0.0221xw,0.0306xh&resize=480:*",
        fullName: "Jon Snow",
        isAdmin: false
    },
    {
        userId: "U007",
        userName: "MonkeyDLuffy",
        avatar: "https://www.fifteenlovers.com/wp-content/uploads/2021/03/monkey-d-luffy-quotes.png",
        fullName: "Monkey D. Luffy",
        isAdmin: false
    },
    {
        userId: "U008",
        userName: "SonTungMtp",
        avatar: "https://kenh14cdn.com/203336854389633024/2021/11/22/13285652342587086741428035430233108735653736n-1622165532863738421439-16375700579971814039704.jpg",
        fullName: "Sơn Tùng MTP",
        isAdmin: false
    },
    {
        userId: "U009",
        userName: "ConnorMcGregor",
        avatar: "https://media-cdn.laodong.vn/Storage/NewsPortal/2020/1/7/777105/NINTCHDBPICT00047860.jpg",
        fullName: "Connor McGregor",
        isAdmin: false
    },
]

function Calendar() {
    //copy editable calendar data
    let CALENDAR_DATA = DUMMY_CALENDAR_DATA;

    //define date
    const [dayObj, setDay] = useState(new Date());
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const startDayOfMonth = startOfMonth(dayObj);
    const endDayOfMonth = endOfMonth(dayObj);
    const daysOfMonth = eachDayOfInterval({
        start: startDayOfMonth,
        end: endDayOfMonth
    });
    const eachSundayOfWeek = eachWeekOfInterval({
        start: startDayOfMonth,
        end: endDayOfMonth
    });
    const weeks = eachSundayOfWeek.map(w => {
        return getWeek(w, {
            weekStartsOn: 0,
            firstWeekContainsDate: 6
        });
    })

    //auth user
    const [authUser, setCurrentUser] = useState({
        userId: DUMMY_USER_DATA[0].userId,
        avatar: DUMMY_USER_DATA[0].avatar,
        fullName: DUMMY_USER_DATA[0].fullName,
        isAdmin: DUMMY_USER_DATA[0].isAdmin
    })
    //only demo mode
    const switchCurrentUserHandle = useCallback((newUser) => {
        setCurrentUser({
            userId: newUser.userId,
            avatar: newUser.avatar,
            fullName: newUser.fullName,
            isAdmin: newUser.isAdmin,
        })
    })

    //owner of calendar
    const [user, setUser] = useState({
        userId: authUser.userId,
        avatar: authUser.avatar,
        fullName: authUser.fullName,
        isAdmin: authUser.isAdmin
    })
    const [userList, setUserList] = useState({
        list: DUMMY_USER_DATA
    })

    const [calendarList, setCalendarList] = useState({
        list: CALENDAR_DATA.filter(x => (x.userId === authUser.userId) && format(new Date(x.date), "MM") === format(dayObj, "MM"))
    });
    const [openCalendar, setOpenCalendar] = useState(false);

    const selectListBtnRef = useRef();
    const [selectListValues, setSelectListValues] = useState({
        left: 0,
        top: 0,
        width: 300,
        isOpen: false,
    })

    //note calendar
    const [noteCalendar, setNoteCalendar] = useState({
        calendarId: null,
        date: null,
        userId: null,
        content: null,
        color: "success",
        isPublic: true
    });
    const setNoteById = useCallback((noteId) => {
        // let note = calendarList.list.find(x => x.calendarId === noteId);
        let note = CALENDAR_DATA.find(x => x.calendarId === noteId);
        if (note) {
            setNoteCalendar(note);
        } else {
            setNoteCalendar({
                calendarId: null,
                date: null,
                userId: null,
                content: null,
                color: "success",
                isPublic: true,
                assignTo: []
            });
        }
    }, [])

    const setNoteByDate = useCallback((date) => {
        setNoteCalendar({
            calendarId: null,
            date: date,
            userId: null,
            content: null,
            color: "success",
            isPublic: true,
            assignTo: []
        });
    }, [])

    //open modal form calendar
    const [openNoteForm, setOpenNoteForm] = useState(false);

    //function
    const changeCalendarHandle = useCallback(() => { //get list calendar on change
        let calendarValues = CALENDAR_DATA.filter(x => (x.userId === authUser.userId) && format(new Date(x.date), "MM") === format(dayObj, "MM"))
        if (authUser.userId !== user.userId) {
            calendarValues = CALENDAR_DATA.filter(x => (x.isPublic === true && x.userId === user.userId) && format(new Date(x.date), "MM") === format(dayObj, "MM"))
        }
        setCalendarList({ list: calendarValues });
    }, [authUser, user, dayObj, CALENDAR_DATA])

    function handleCalendarNext() { //next month
        let newDay = addMonths(dayObj, 1)
        setDay(newDay);
        changeCalendarHandle();
    }

    function handleCalendarPrev() { //previous month
        let newDay = subMonths(dayObj, 1)
        setDay(newDay);
        changeCalendarHandle();
    }

    function toggleCalendar() {
        setOpenCalendar(!openCalendar);
    }

    function toggleUserSelect() {
        const { offsetTop, offsetLeft, offsetHeight } = selectListBtnRef.current;
        setSelectListValues({ ...selectListValues, left: offsetLeft, top: offsetTop + offsetHeight, isOpen: !selectListValues.isOpen });
    }

    const userSelectHandle = (user) => {
        setUser({
            userId: user.userId,
            avatar: user.avatar,
            fullName: user.fullName,
            isAdmin: user.isAdmin
        })
        changeCalendarHandle();
    }

    const searchUserHandle = (userInput) => {
        setUserList({
            list: DUMMY_USER_DATA.filter(x => x.fullName.toLowerCase().includes(userInput.toLowerCase()))
        })
    }

    const toggleNoteFormHandle = (note) => {
        setNoteById(note);
        setOpenNoteForm(!openNoteForm);
    }

    const createNewNoteByDate = (date) => {
        setNoteByDate(date);
        setOpenNoteForm(!openNoteForm);
    }

    const changePrivacyHandle = (id) => {
        let item = CALENDAR_DATA.find(cd => cd.calendarId === id)
        if (authUser.userId === item.userId && authUser.userId === user.userId) {
            item.isPublic = !item.isPublic;
        } else {
            return;
        }
    }

    const saveNoteHandle = useCallback((note, userListParam) => {
        console.log(userListParam);
        if (userListParam.length > 0) {
            userListParam.map(user => {
                let userIdIndex = userList.list.findIndex(x => x.fullName === user);
                if (userIdIndex > -1) {
                    let userId = userList.list.find(x => x.fullName === user).userId;
                    let index = CALENDAR_DATA.findIndex(cd => cd.calendarId === note.calendarId);
                    if (index > -1) {
                        let item = CALENDAR_DATA.find(cd => cd.calendarId === note.calendarId);
                        item = {
                            ...item,
                            date: note.date,
                            userId: userId,
                            content: note.content,
                            color: note.color,
                            isPublic: note.isPublic,
                            assignTo: userListParam
                        }

                        // if (authUser.userId === user.userId) {
                        //     CALENDAR_DATA[index] = item;
                        // }

                        CALENDAR_DATA[index] = item;
                    }
                    else {
                        let item = {
                            calendarId: `C${CALENDAR_DATA.length + 1}`,
                            date: format(new Date(note.date), "yyyy/MM/dd"),
                            userId: userId,
                            content: note.content,
                            color: note.color,
                            isPublic: note.isPublic,
                            assignTo: userListParam
                        }
                        CALENDAR_DATA.push(item);
                    }
                }
            });
        } else {
            let index = CALENDAR_DATA.findIndex(cd => cd.calendarId === note.calendarId);
            if (index > -1) {
                let item = CALENDAR_DATA.find(cd => cd.calendarId === note.calendarId);
                item = {
                    ...item,
                    date: note.date,
                    userId: authUser.userId,
                    content: note.content,
                    color: note.color,
                    isPublic: note.isPublic,
                    assignTo: []
                }

                if (authUser.userId === user.userId) {
                    CALENDAR_DATA[index] = item;
                    console.log('2')
                }
            }
            else {
                let item = {
                    calendarId: `C${CALENDAR_DATA.length + 1}`,
                    date: format(new Date(note.date), "yyyy/MM/dd"),
                    userId: authUser.userId,
                    content: note.content,
                    color: note.color,
                    isPublic: note.isPublic,
                    assignTo: []
                }
                if (authUser.userId === user.userId) {
                    CALENDAR_DATA.push(item);
                    console.log('3')
                }
            }
        }

        changeCalendarHandle();
    }, [CALENDAR_DATA])

    //close menu user selection when clicked away
    function clickAwaySelectUser() {
        if (selectListValues.isOpen) {
            setSelectListValues({ ...selectListValues, isOpen: false });
            setUserList({
                list: DUMMY_USER_DATA
            })
        }
    }

    //close calendar popup when clicked away
    function clickAwayCalendar() {
        if (openCalendar) {
            setOpenCalendar(false);
        }
    }

    useEffect(() => {
        setNoteById();
        changeCalendarHandle();
    }, [changeCalendarHandle, setNoteById, CALENDAR_DATA])

    return (
        <div className="main-content">
            <Grid container spacing={2}>
                <Grid item lg={12}>
                    <Card>
                        <CardContent className={classes["calendar"]}>
                            <div className={`${classes["calendar__header"]}`}>
                                <div className={classes["user__wrap"]}>
                                    <Stack className={classes["user__container"]} direction="row" spacing={1}>
                                        <Avatar alt={user.fullName} src={user.avatar} />
                                        <div className={classes["user__text"]} >
                                            {user.fullName}
                                        </div>
                                        <ClickAwayListener onClickAway={clickAwaySelectUser}>
                                            <div>
                                                <IconButton aria-label="calendar" className={classes["button"]} ref={selectListBtnRef}
                                                    onClick={toggleUserSelect}>
                                                    <KeyboardArrowDownIcon className={classes["button__icon"]} />
                                                </IconButton>
                                                {selectListValues.isOpen ? <Box sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    '& > :not(style)': {
                                                        m: 1,
                                                        width: selectListValues.width,
                                                        height: 'auto',
                                                        position: 'absolute',
                                                        left: selectListValues.left - selectListValues.width,
                                                        top: selectListValues.top,
                                                        backgroundColor: '#f8f8fb'
                                                    },
                                                }}>
                                                    <Paper elevation={3} className={classes["menu_user"]} >
                                                        <UserSearch
                                                            onSearchInputChange={searchUserHandle}
                                                        />
                                                        <MenuList className={`${classes["menu_user__container"]} ${classes["scrollable"]}`}>
                                                            {userList.list.map(user => (
                                                                <UserMenuItem key={user.userId}
                                                                    user={user}
                                                                    onSelectUser={userSelectHandle}
                                                                    onSwitchCurrentUser={switchCurrentUserHandle}
                                                                />
                                                            ))}
                                                        </MenuList>
                                                    </Paper>
                                                </Box> : null}
                                            </div>
                                        </ClickAwayListener>
                                    </Stack>
                                </div>
                                <Stack className={`${classes["date-time__wrap"]}`} direction="row" spacing={1}>
                                    <IconButton aria-label="previous" className={`${classes["date-time__button"]}`} onClick={handleCalendarPrev}>
                                        <NavigateBeforeIcon className={`${classes["button__icon"]}`} />
                                    </IconButton>
                                    <div className={`${classes["date-time__text"]}`}>
                                        {format(dayObj, "MMMM - yyyy")}
                                    </div>
                                    <ClickAwayListener onClickAway={clickAwayCalendar}>
                                        <div>
                                            <IconButton aria-label="calendar" className={`${classes["date-time__button"]}`} onClick={toggleCalendar}>
                                                <CalendarTodayIcon className={`${classes["button__icon"]}`} />
                                            </IconButton>
                                            {openCalendar ? (
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    '& > :not(style)': {
                                                        m: 1,
                                                        width: 320,
                                                        height: 'auto',
                                                        position: 'absolute',
                                                        backgroundColor: '#f8f8fb'
                                                    },
                                                }}>
                                                    <Paper elevation={3} >
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <Grid item xs={12} md={6}>
                                                                <CalendarPicker date={dayObj} onMonthChange={(newDate) => {
                                                                    setDay(newDate);
                                                                }}
                                                                    onChange={(newDate) => {
                                                                        setDay(newDate);
                                                                    }} />
                                                            </Grid>
                                                        </LocalizationProvider>
                                                    </Paper>
                                                </Box>
                                            ) : null}

                                        </div>
                                    </ClickAwayListener>
                                    <IconButton aria-label="previous" className={`${classes["date-time__button"]}`} onClick={handleCalendarNext}>
                                        <NavigateNextIcon className={`${classes["button__icon"]}`} />
                                    </IconButton>
                                </Stack>
                                <div className={classes["none__wrap"]}>

                                </div>
                            </div>
                            <div className={classes["calendar__body"]}>
                                <div className={classes["week__wrap"]}>
                                    {weeks.map(w => (
                                        <div className={classes["week"]} key={w}>
                                            <div className={classes["week__text"]}>
                                                {w}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={classes["date__wrap"]}>
                                    <div className={classes["date-name__wrap"]}>
                                        {weekDays.map(w => (
                                            <div className={classes["date-name"]} key={w} >
                                                <div className={classes["date-name__text"]}>
                                                    {w}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {_.range(getDay(startDayOfMonth)).map(i => (
                                        <div className={`${classes["date__container"]} ${classes["date__container--fade"]}`} key={i}>
                                            <div className={`${classes["date"]}`}>
                                                <div className={classes["date__text"]}>
                                                    {format(subDays(startDayOfMonth, getDay(startDayOfMonth) - i), "dd")}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {_.range(daysOfMonth.length).map(i => (
                                        <div className={`${classes["date__container"]} 
                                        ${format(addDays(startDayOfMonth, i), "dd") === format(today, "dd") ?
                                                classes["date__container--active"] : ""}`} key={i}
                                        >
                                            <Box className={`${classes["date"]}`} onDoubleClick={() => {
                                                if (authUser.userId !== user.userId) {
                                                    return;
                                                }
                                                createNewNoteByDate(format(addDays(startDayOfMonth, i), "yyyy/MM/dd"));
                                            }
                                            }>
                                                <div className={classes["date__text"]}>
                                                    {format(addDays(startDayOfMonth, i), "dd")}
                                                </div>
                                                <Stack spacing={0.25} className={classes["scrollable"]} onChange={changeCalendarHandle}>
                                                    {calendarList.list.filter(data => format(new Date(data.date), "yyyy/MM/dd") === format(addDays(startDayOfMonth, i), "yyyy/MM/dd")).map((d, index) => (
                                                        <CalendarItem
                                                            key={`${d}_${index}`}
                                                            calendarItem={d}
                                                            currentUser={authUser.userId}
                                                            onChangePrivacy={changePrivacyHandle}
                                                            onOpenNoteForm={toggleNoteFormHandle}
                                                        />
                                                    ))}
                                                </Stack>
                                            </Box>
                                        </div>
                                    ))}
                                    {_.range(6 - getDay(endDayOfMonth)).map(i => (
                                        <div className={`${classes["date__container"]} ${classes["date__container--fade"]}`} key={i}>
                                            <div className={`${classes["date"]}`}>
                                                <div className={classes["date__text"]}>
                                                    {format(addDays(endDayOfMonth, i + 1), "dd")}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <div className="calendar">
                </div>
            </Grid>
            <NoteForm open={openNoteForm}
                onClose={toggleNoteFormHandle}
                calendarId={noteCalendar.calendarId}
                content={noteCalendar.content}
                color={noteCalendar.color}
                userId={authUser.userId}
                isPublic={noteCalendar.isPublic}
                date={noteCalendar.date}
                assignTo={noteCalendar.assignTo}
                userList={userList.list}
                isAdmin={authUser.isAdmin}
                onSaveNote={saveNoteHandle} />

        </div >

    );
}

export default Calendar;