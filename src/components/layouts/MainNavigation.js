import classes from './MainNavigation.module.scss';
import { Link } from 'react-router-dom';

function MainNavigation() {
    return (
        <>
            <div className={classes['page-topbar']}>
                <div className={classes['navbar-header']}>
                    <div className={classes['']}>

                    </div>
                </div>
            </div>
            <div className={classes['vertical-menu']}>
                <div className={classes['sidebar-menu']}>
                    <ul className={classes['menu']}>
                        <li className={classes['menu__title']}>
                            Menu
                        </li>
                        <li>
                            <Link to='/'>
                                <i className="bx bx-home-circle">
                                </i>
                                <span>Dashboards</span>
                            </Link>
                        </li>
                        <li className={classes['menu__title']}>
                            Apps
                        </li>
                        <li>
                            <Link to='/calendar'>
                                <i className="bx bx-calendar"></i>
                                <span>Calendar</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/timesheet'>
                                <i className='bx bx-briefcase-alt-2'></i>
                                <span>Time sheet</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/overtime'>
                                <i className='bx bx-time' ></i>
                                <span>Over time</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/leavehistory'>
                                <i className='bx bx-spreadsheet' ></i>
                                <span>Leave form</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default MainNavigation;