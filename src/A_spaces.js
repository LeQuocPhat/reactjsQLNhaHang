import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import API, { endpoints } from './API';
import { Link } from 'react-router-dom';
import HallCard from './HallCard';


export default function A_spaces() {

    const [Halls, setHalls] = useState([])

    useEffect(() => {
        let loadHalls = async () => {
            try {
                let res = await API.get(endpoints["weddinghalls"])
                setHalls(res.data.results)
            } catch(err) {
                console.error(err)
            }
        }

        loadHalls()
    }, [])

    return (
        <>
            <section className="space">
                <div className="space-content center">
                    <h2>KHÔNG GIAN SẢNH </h2>
                </div>
                <Row>
                    {Halls.map(h=> <HallCard obj={h} type="hall"/>)}
                </Row>
            </section>
        </>
    );

}
