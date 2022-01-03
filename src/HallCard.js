import {Card, Col} from "react-bootstrap"
import {Link} from "react-router-dom"

export default function HallCard(props){
    let path =`/Banquet hall`
    if (props.type === "hall")
        path = `/Banquet hall/${props.obj.id}`
    return (
        <div className="space-party">
                    <div className="space-party-list">
                           <> <div className="space-party-row" id={props.obj.id}>
                                <div className="space-party-img">
                                    <img src={props.obj.image} alt="sanh" />
                                </div>
                                <div className="space-party-content">
                                    <p> {props.obj.name} </p>
                                    <Link to={path}>
                                        <div className="deti">
                                            <button class="bt-deti">Chi tiết</button>
                                        </div>
                                    </Link>
                                </div>
                            </div></>
                    </div>
        </div>
    )
}