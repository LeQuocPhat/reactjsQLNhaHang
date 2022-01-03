import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { ButtonGroup, Button} from 'react-bootstrap'
import API, { endpoints } from './API';

export default function A_menu(){
    
    // const [Foods, setFoods] = useState([])
    const [Menus, setMenus] = useState([])
    // const location = useLocation()

    useEffect( async () => {
          try {
            // let res2 = await API.get(`${endpoints['menus']}${location.search}`)
            let res2 = await API.get(endpoints['menus'])
            setMenus(res2.data.results)
            // let res1 = await API.get(`${endpoints["foods"]}${query}`)
            // setFoods(res1.data)
          } catch (error) {console.error(error)}
       
      }, []);

     const onClick = (x) => {
        if(x.target.classList.contains("food-menu-button")) 
        {
        const choseMenu =  document.querySelector(".food-menu")
        const Target = x.target.getAttribute("data-food");
        choseMenu.querySelector(".active").classList.remove("active")
        x.target.classList.add("active") /*x đã điều hướng tới button*/

        const putMenu =  document.querySelector(".food-elective")
        putMenu.querySelector(".food-elective-items.active").classList.remove("active")
        putMenu.querySelector(Target).classList.add("active")
        }       
    }
    const closePic = () => {
           document.querySelector(".zoomOver-wrap").style.display = "none" 
    }

    const  zoomImg = () =>{
        const bigImg = document.querySelector(".zoomOver img")
        const smallImg =  document.querySelectorAll(".food-list-itme img")
        smallImg.forEach(imgItem =>
            imgItem .addEventListener("click",function(){
                bigImg.src = imgItem.src
                document.querySelector(".zoomOver-wrap").style.display="flex"
            })
         )};

        return (
            <>
            <section className="food" style ={{marginTop: '35px'}}>
                <div className="food-title">
                    
                </div>
                <div className="food-title">
                    <div className="food-title-txt center">
                        <h2>Thực đơn tiệc cưới mới nhất 2021</h2>
                    </div>
                    <p>Trung tâm tiệc cưới Melisa phục vụ hơn 150 món ăn phong cách Âu – Á</p>
                </div>

                <div className="food-list" onClick = { () => zoomImg ()}>
                    <div className="food-list-itme">
                        {Menus.map( c => 
                                <img src = {c.image}  />  
                        )}
                    </div>
                    
                </div>
                <div className="zoomOver-wrap">
                        <div className="zoomOver">
                            <span><i className="far fa-times-circle" onClick ={() => closePic()} style={{ color: 'black !important', fontSize: '40px', cursor: 'pointer' }} /></span>
                            <img style={{ width: '100%' }} src="images/food/menu1.jpg" />
                        </div>
                </div>

            </section>

        </>
     );

}