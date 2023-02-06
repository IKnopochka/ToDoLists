import React, {useState} from 'react';
import styles from './Site.module.css'
import {Navigate, NavLink, Route, Routes} from 'react-router-dom'
import {Error404} from "./pages/Error404";
import {Page} from "./pages/Page";
import {dataState} from "../dataState/dataState";
import {useWindowSize} from "../customHooks/UseWindowSize";
import {LocalStorage} from "./pages/LocalStorage";



export const Site = () => {
    const [burger, setBurger] = useState<boolean>(true)

    const widthSize = useWindowSize();

    return (
        <div>
            <div className={styles.header}><h1>HEADER</h1></div>
            <div className={styles.body}>
                {widthSize > 1000
                    ? <div className={styles.nav}>
                        <div>
                            <NavLink to={'/page/0'} className={({isActive}) => isActive ? styles.active : styles.navLink}>Page 1</NavLink>
                        </div>
                        <div>
                            <NavLink to={'/page/1'} className={isActive => isActive.isActive ? styles.active : styles.navLink}>Page 2</NavLink>
                        </div>
                        <div>
                            <NavLink to={'/page/2'} className={isActive => isActive.isActive ? styles.active : styles.navLink}>Page 3</NavLink>
                        </div>
                        <div>
                            <NavLink to={'/page/local_storage'} className={isActive => isActive.isActive ? styles.active : styles.navLink}>Local Storage</NavLink>
                        </div>
                        {/*<div><NavLink to={'/page3'} className={isActive => activeLink(isActive.isActive)}>Page 3</NavLink></div>*/}
                    </div>
                    : <div></div>
                }

                <div className={styles.content}>
                    <Routes>
                        <Route path={'/'} element={<Navigate to={'/page/0'}/>}/>

                        <Route path={'/page/:id'} element={<Page pages={dataState.pages}/>}/>
                        <Route path={'/page/local_storage'} element={<LocalStorage/>}/>


                        {/*                        <Route path={'/page2'} element={<PageTwo/>}/>
                        <Route path={'/page3'} element={<PageThree/>}/>*/}
                        <Route path={'/*'} element={<Error404/>}/>

                    </Routes>
                </div>
            </div>
        </div>
    );
};




/*return (
    <div>
        {size.width}px / {size.height}px
    </div>
);*/

