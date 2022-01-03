import { useContext ,useEffect, useState } from "react"
import { Col, Row, Spinner, Image } from "react-bootstrap"
import Rating from "react-rating"
import {useParams} from "react-router"
import cookies from 'react-cookies'
import { UserContext } from './App';
import API, { endpoints } from "./API"



export default function ServiceDetail() {
    const [service, setService] = useState(null)
    const [rating, setRating] = useState(0)
    const auth = useContext(UserContext)
    const [countNu, setCount] = useState(1)
    // const [Users, setUsers] = useState([])
    let {serviceId} = useParams()

    useEffect(() => {
        let loadService = async () => {
            try {
                let res = await API.get(endpoints["service-detail"](serviceId),
                    {
                        headers: {
                            'Authorization': `Bearer ${cookies.load('access_token')}`
                          }
                    })
                setService(res.data)
                setRating(res.data.rate)
            } catch(err) {
                console.error(err)
            }
        }

        // let loadUser = async () => {
        //     try {
        //         let res2 = await API.get(endpoints['users'])
        //         setUsers(res2.data)
        //     } catch (error) {
        //         console.error(error)
        //     }
        // }

        loadService()
        // loadUser()
    }, [countNu])
    let user = auth.user

    if (cookies.load("user") != null)
        user = cookies.load("user")

    const saveRating= async (rate) => {
        if (window.confirm("Bạn muốn đánh giá dịch vụ của nhà hàng?") == true) {
            try {
                let res3 = await API.post(endpoints['rating'](serviceId), {
                    "rating" : rate
                },{
                    headers: {
                        'Authorization': `Bearer ${cookies.load('access_token')}`
                      }
                })
                console.info(res3.data)
            } catch(err) {
                console.error(err)
            }
        }
    }

    if (service === null)
        return <Spinner animation="border"/>

    let r = ""

    if (user !== null) {
        r =  <Rating initialRating= {rating} onClick={saveRating}/>
    }

    return(
        <>
            <hr/>
            <h1 class="text-danger text-center">CHI TIẾT DỊCH VỤ</h1>
            <hr/>
            <Row>
                <Col md={4} xs={12}>
                    <Image src={service.image} rounded fluid />
                </Col>
                <Col md={8} xs={12}>
                    <h2>{service.name}</h2>
                    <div>
                        {service.description}
                    </div>
                    <p>{r}</p>
                </Col>
            </Row>
            <hr/>
        </>
    )
}