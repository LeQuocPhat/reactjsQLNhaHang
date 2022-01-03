import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
// import { Card, Col, Container, Row } from 'react-bootstrap';
// import API, { endpoints } from './API';
import { Line } from "react-chartjs-2";
import API, { endpoints } from './API';
import {
    useHistory,
    useLocation
  } from "react-router-dom";

export default function A_reports() {
    const [weddings, setWeddings] = useState([])
    const [timeFrom, setTimeFrom] = useState('')
    const [timeTo, SetTimeTo] = useState('')
    const [ite, SetItem] = useState([])
    const [label, setLabel] = useState([50,50,50,50])

    const [k, setDTT] = useState([])

    useEffect(() => {

        API.get(endpoints['weddings']).then(res => {
            setWeddings(res.data.results)
        })

    }, [])

    const isSeach2 = (event) => {
        SetItem([])
        setLabel([])
        setDTT([])
        const dl = event.target.value
        const ten = event.target.name
        if (ten == 'setTimeFrom')
            setTimeFrom(dl)
        else {
            SetTimeTo(dl)
        }

    }

    let history=useHistory()

    const getText = (data, data2) => {
        console.log(data, data2);

        let dd = new Date(data)
        let dd2 = new Date(data2)

        // var k =[]
        for (let i = dd.getMonth() + 1; i <= dd2.getMonth() + 1; i++) {

            label.push(dd.getFullYear() + "-" + i)
            k.push(dd.getFullYear() + "-" + i)
        }
        let cout = 0;
        for (let j = 0; j <= k.length; j++) {
            weddings.map(w => {

                var dw = new Date(w.organization_date.substring(0, 7))

                var res2 = +dw <= +dd2
                var res1 = +dw >= +dd

                if (res1) {
                    console.log(res1)
                    if (res2) {
                        // console.log('212')
                        // res.push(w)
                        let k2 = (dw.getFullYear() + "-" + (dw.getMonth()+1));
                        console.log(k2)
                        if (k2 == k[j]) {
                            cout++
                            // console(cout)
                        }

                    }
                }

            })
            ite.push(cout)
            cout = 0
        }
        history.replace("/Chart")

        // // label = label + k
        // console.log(label)
        // console.log(ite)
        // // SetItem([])
        // // setLabel([])
    }




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
               
               
            </section>

            <div style={{ minHeight: '400px', display: 'flex' }} >
            <div id="report" style={{ width: '20%' , paddingLeft:'20px'}}>
                <div id="material-tabs">
                    <div className="report-group">
                        <label>Thời gian bắt đầu</label>
                        <input type="month" defaultValue="" name="setTimeFrom" require onChange={(event) => isSeach2(event)} />
                    </div>
                    <div className="report-group">
                        <label>Thời gian kết thúc</label>
                        <input type="month" defaultValue="" name="setTimeTo" require onChange={(event) => isSeach2(event)} />
                    </div>
                    <div className="report-group">
                        {/* <input type="text"className="btn btn-primary"  /> */}
                        <button variant="primary" onClick={(data) => getText(timeFrom, timeTo)}>TÌm</button>
                    </div>
                </div>
            </div>



            <Container>
                <Line
                    height={400}
                    width={1000}
                    data={{
                        labels: label,
                        datasets: [
                            {
                                label: 'Mật độ tiệc cưới',
                                data: [2, 6, 3, 4, 3],
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1
                            }, {
                                type: 'bar',
                                label: 'Doanh thu',
                                data: ite,
                                fill: false,
                                borderColor: 'rgb(54, 162, 235)',
                                backgroundColor: [
                                    "#3e95cd",
                                    "#8e5ea2",
                                    "#3cba9f",
                                    "#e8c3b9",
                                    "#c45850"
                                ],
                            }
                        ],

                    }}
                    options={{
                        legend: { display: false },
                        title: {
                            display: true,
                            text: "Predicted world population (millions) in 2050"
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }} />
            </Container>
        </div>
        </>
        
    )
}

