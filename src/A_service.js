import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import API, { endpoints } from './API';
import { UserContext } from './App';
import cookies from 'react-cookies'
import { Link } from 'react-router-dom';
import ServiceCard from './ServiceCard';

export default function A_service() {
    const [Comment, setCommet] = useState([])
    const [AddComment, setAddComment] = useState([])
    const [Services, setServices] = useState([])
    const auth = useContext(UserContext)
    const [countNu, setCount] = useState(1)
    const [Users, setUsers] = useState([])

    useEffect(() => {
        let loadComment = async () => {
            try {
                let res = await API.get(endpoints['comments'])
                setCommet(res.data)
                let res3 = await API.get(endpoints['services'])
                setServices(res3.data.results)
            } catch (error) {
                console.error(error)
            }
        }

        let loadUser = async () => {
            try {
                let res2 = await API.get(endpoints['users'])
                setUsers(res2.data)
            } catch (error) {
                console.error(error)
            }
        }
        loadComment()
        loadUser()
    }, [countNu])
    let user = auth.user
    if (cookies.load("user") != null)
        user = cookies.load("user")

    const addComment = async (event) => {
        event.preventDefault()

        API.post(endpoints['comments'], {
            "content": AddComment,
            "creator": user.id
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.info(res)
            Comment.push(res.data)
            setCommet(Comment)
            setCount(Comment.lenght)
            alert("successful!!!")
            setAddComment("")

        }).catch(err => {
            console.error(err)
            alert(" Comment failed!!!")
        })


    }
    let comment = <em><a href="#">C???n login ????? b??nh lu???n!!!</a></em>
    if (user !== null) {
        comment = <>
            <Form onSubmit={addComment}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ display: 'flex' }}>
                    <Form.Control type="text" placeholder="Nh???p b??nh lu???n" value={AddComment}
                        onChange={(event) => setAddComment(event.target.value)} style={{ margin: '0', width: '90%' }} />
                    {console.log(AddComment)}
                    <Button variant="primary" type="submit" style={{ margin: '0' }}>Comment</Button>{' '}

                </Form.Group>
            </Form>
        </>
    }


    return (
        <div>

            <section class="service">
                <div class="wrap">
                    <div class="service-title-top center">
                        <h2>D???ch v??? ti???c c?????i</h2>
                    </div>
                    <div class="service-info-wrap">
                        <div class="service-title-bottom">
                            <p>V???i mong mu???n g??p ph???n t?? v??? n??n chuy???n t??nh y??u ?????p c???a l???a ????i,<b> Trung T??m Ti???c C?????i H???i Ngh??? Melisa Center h??n h???nh ???????c ph???c v??? ti???c c?????i c???a B???n</b></p>
                            <p>T??? l??u nay, nh???ng giai ??i???u t??nh y??u ???? vang l??n trong con tim c???a m???i ng?????i,
                                ????a ?????n nh???ng cung b???c th??ng hoa trong nh???ng t??m h???n ?????ng ??i???u v?? r???i l??? c?????i
                                ch??nh l?? minh ch???ng c???a m???t b???n giao h?????ng t??nh y??u m??nh li???t</p>
                        </div>
                        
                        <Row>
                            {Services.map(s=> <ServiceCard obj={s} type="service"/>)}
                        </Row>
                    </div>
                </div>
            </section>
            <section>
                <Container>
                    {comment}
                    <hr />
                    <div data-sp="scroll" >
                        {Comment.map(c =>
                            <Row id={c.id}>
                                <Col>
                                    <Card style={{ borderRadius: '15px', height: '100px' }}>
                                        {Users.map(u => {
                                            if (u.id == c.creator)
                                                return <>
                                                    <Card.Body id={u.id}>
                                                        <blockquote className="blockquote mb-0">
                                                            <p>
                                                                <Image src={u.avatar} roundedCircle style={{ width: '3%' }} />&nbsp;

                                                                <span>{u.username}</span>&nbsp;|
                                                                <span>{u.email}</span></p>
                                                            <p>
                                                                {' '}
                                                                <span>{c.content}</span>{' '}&nbsp;|
                                                                <span> v??o l??c: <Moment fromNow>{c.created_date}</Moment>
                                                                    <cite title="Source Title">Source Title</cite></span>
                                                            </p>
                                                        </blockquote>
                                                    </Card.Body>
                                                </>
                                        })}
                                    </Card><hr />
                                </Col>
                            </Row>
                        )}

                    </div>

                </Container>

            </section>

        </div>
    );
}
