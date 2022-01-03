import {Card, Col} from "react-bootstrap"
import {Link} from "react-router-dom"

export default function ServiceCard(props){
    let path =`/Service`
    if (props.type === "service")
        path = `/Service/${props.obj.id}`
    return (
        <Col md={6} xs={12}>
            <Card>
                <Link to={path}>
                    <Card.Img variant="top" src={props.obj.image}/>
                </Link>
                <Card.Body>
                    <Card.Title>{props.obj.name}</Card.Title>
                    {/* <Card.Text>{props.obj.description}</Card.Text> */}
                </Card.Body>
            </Card>
        </Col>
    )
}