import { useEffect, useState } from "react"
import { Col, Row, Spinner, Image } from "react-bootstrap"
import {useParams} from "react-router"
import API, { endpoints } from "./API"



export default function HallDetail() {
    const [hall, setHall] = useState(null)
    let {hallId} = useParams()

    useEffect(() => {
        let loadHall = async () => {
            try {
                let res = await API.get(endpoints["hall-detail"](hallId))
                setHall(res.data)
            } catch(err) {
                console.error(err)
            }
        }

        loadHall()
    }, [])

    if (hall === null)
        return <Spinner animation="border"/>

    return(
        <>
            <hr/>
            <h1 class="text-danger text-center">CHI TIẾT SẢNH CƯỚI</h1>
            <hr/>
            <Row>
                <Col md={4} xs={12}>
                    <Image src={hall.image} rounded fluid />
                </Col>
                <Col md={8} xs={12}>
                    <h2>{hall.name}</h2>
                    <div>
                        {hall.description}
                    </div>
                </Col>
            </Row>
            <hr/>
        </>
    )
}