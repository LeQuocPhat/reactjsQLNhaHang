import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cookies from 'react-cookies'
import { UserContext } from './App';
import API, { endpoints } from './API';
import {  useHistory } from 'react-router-dom';

export default function A_header(props) {
    const auth = useContext(UserContext)
    const [Setting, setSetting] = (useState([]))
    const [countNu, setCount] = useState(0)
    let history=useHistory()

    useEffect(async () => {
        let res = await API.get(endpoints['systems'])
        setSetting(res.data)
        window.addEventListener('scroll', handleScroll);
    }, [countNu])

    function handleScroll() {
        const header = document.querySelector(".header")
        const bar = document.querySelector(".row")
        const x = this.pageYOffset
        if (x > 150) {
            header.classList.add('active')
            bar.classList.add("active")
        }
        else {
            header.classList.remove("active")
            bar.classList.remove("active")
        }
    }
    const logOut = () => {
        cookies.remove("access_token")
        cookies.remove("user")
        setCount(user.lenght)
        history.replace("/")
    }
    let user = auth.user
    if (cookies.load("user") != null)
        user = cookies.load("user")
    let r = <>
        <li onClick={() => props.openFLogin()}><Link to="/" onClick={() => props.putAtt('Login')}>Login</Link></li>
        <li style={{ borderRight: 'none' }} onClick={() => props.openFLogin()}><Link to="/" onClick={() => props.putAtt('Registe')}>Register</Link></li>
    </>
    if (user !== null)
        r = <><li><Link to="/">Hi, {user.username}</Link></li>
            <li><Link to="/" onClick={() => logOut()}>Log out </Link></li>
        </>
    // history.push({ pathname: '../Login' })
    return (
        <div>
            <section className="header">
                <div className="contai">
                    <div className="contact"  id="header">
                        <nav>
                            <ul>
                                {r}
                            </ul>
                        </nav>
                    </div>
                    <div className="row">
                        <div className="muli">
                            <div className="search">
                                <div className="search-icon">
                                    <i className="fas fa-times" ></i><input type="text" placeholder="Nh???p t??? kh??a t??m ki???m" /><i className="fas fa-search"></i>
                                </div>
                            </div>
                        </div>
                        {/* <div className="logo">
                            <a href="http://localhost:3000/"><img src="images/logo/logo.svg" /></a>
                        </div> */}
                        <div className="menu-bar">
                            <nav>
                                <ul className="menu-bar-left-items row">
                                    <li className="logo"><a href="http://localhost:3000/"><img src="images/logo/logo.svg" /></a></li>
                                    {/* <li><i className="fas fa-search fa"></i> </li> */}
                                    <li className="menu-bar-items-sub">
                                        <Link to="/">Home page</Link>
                                    </li>
                                    {Setting.map(s => {
                                        // let path = `/?system_id=${s.id}`
                                        return <><li className="menu-bar-items-sub" >
                                                    <Link to={s.name}>{s.name}</Link>
                                                </li></>
                                    })}
                                    {/* <li className="menu-bar-items-sub">
                                        <a href="#">H??? th???ng</a>
                                    </li>
                                    <li ><Link to="/menu">Th???c ????n</Link></li>
                                    <li className="menu-bar-items-sub">
                                        <a >Ti???c c?????i</a>
                                        <ul className="menu-bar-items-sub1">
                                            <li><Link to="/service">D???ch v??? ti???c c?????i</Link></li>
                                            <li><Link to="/weddinghalls">S???nh ti???c</Link></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">About us</a></li>
                                    <li className="menu-bar-items-sub">
                                        <a href="#">Blog</a>
                                        <ul className="menu-bar-items-sub1">
                                            <li><a href="#">Th???c ????n</a></li>
                                            <li><a href="#">Th???c ????n</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Tuy???n d???ng</a></li> */}

                                </ul>
                            </nav>
                        </div>
                        <div>
                            <button className="btOrder" ><a style ={{color: 'white' , textDecoration: 'none'}} 
                            href="#regPart">?????t ti???c</a></button>
                        </div>

                        {/* <div className="menu-bar">
                            <nav>
                                <ul className="menu-bar-right-food row">
                                    <li><a href="#">Li??n h???</a></li>
                                    <li className="menu-bar-items-sub">
                                        <a href="#">Blog</a>
                                        <ul className="menu-bar-items-sub1">
                                            <li><a href="#">Th???c ????n</a></li>
                                            <li><a href="#">Th???c ????n</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Tuy???n d???ng</a></li>
                                    <li><button className="btOrder">?????t ti???c</button></li>
                                </ul>
                            </nav>
                        </div> */}
                    </div>
                </div>
            </section>
            <section className="imageMain">
                <div className="imageMain-content">
                    <div className="imageMain-content-text" style={{ height: '110px' }}>
                        <img src="" />
                    </div>
                    <div className="imageMain-content-textsmall" style={{ textAlign: 'center' }}>
                        <h2>TRUNG T??M T??? CH???C TI???C C?????I V?? S??? KI???N</h2>
                    </div>

                </div>

            </section>
        </div>
    );

}

