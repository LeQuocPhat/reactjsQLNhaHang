import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormControl, InputGroup, Table } from 'react-bootstrap';
import API, { endpoints } from './API';
import cookies from 'react-cookies'
import { Link, useHistory } from 'react-router-dom';

class A_formRegister extends React.Component {
    constructor() {
        super()
        // const auth = useContext(UserContext)
        this.state = {
            "weddings": [],
            "tempData": '',
            "tempData2": '',
            "getData1": '',
            "getData2": '',
            "name": "",
            "shif": "",
            "organization_date": "",
            "men": "",
            "servic": "",
            "stk": "",
            "wedding_hal": "",

        }
    }

    componentDidMount() {
        API.get(endpoints['weddings']).then(res => {
            this.setState({
                "weddings": res.data.results
            })
        })
    }
    isSeach1 = (event) => {
       
        let dl = event.target.value
        // let newStateArray = this.state.tempData1.slice();
        // newStateArray.push(dl);
        this.setState({
            tempData1: dl
        })
        console.log(this.state.tempData1)
    }
    isSeach2 = (event) => {
       
        let dl = event.target.value
        // let newStateArray = this.state.tempData2.slice();
        // newStateArray.push(dl);
        this.setState({
            tempData2: dl
        })
        console.log(this.state.tempData2)
    }
    getText = (data,data2) => {
        this.setState({
            getData1: data,
            getData2: data2,
        })
        console.log(data, data2);
    }

    isChange2 = (event) => {
        const dl = event.target.value
        const ten = event.target.name
        this.setState({
            [ten]: dl
        })
    }

    isReset = () => {
        this.setState({
            "name": "",
            "shif": "",
            "organization_date": "",
            "men": "",
            "servic": "",
            "stk": "",
            "wedding_hal": "",
        })
    }

    inPutInfo = () => {
        var n = this.state.shif.indexOf(",")
        // var array = this.state.weddingsCopy
        var array = {
            "name": `${this.state.name}`,
            "wedding_hall": {
                "name": `${this.state.wedding_hal}`
            },
            "organization_date": `${this.state.organization_date}`,
            "shift": {
                "name": `${this.state.shif.substring(0, n)}`,
                "price": `${this.state.shif.substring(n + 1)}`
            },
            "menu": {
                "name": `${this.state.men}`
            },
            "stk": `${this.state.stk}`,
            // "service": [
            //     {
            //       "name": `${this.state.servic}`
            //     }
            //   ]
        }
        // var er ="" // cần dùng push history đảy về trang chủ
       
        // if(array.name == "" || array.wedding_hall.name == ""||
        // array.organization_date == ""||array.shift.name == ""||array.menu.name == ""){
        //     alert("please fill all fields")
        //     {<Link to="/"></Link>}
        //     return ;
        // }else{
        //     this.props.getIf(array)
        //     {onclick = this.props.open}
        //     return;
        // }
        this.props.getIf(array)

        console.log(array)
        // this.props.getIf(array)
    }

    render() {

        var arrayData = []
        var arrayData2 = []
        var arrayData3 = []
        this.state.weddings.filter((item) => {
                 if(item.shift == this.state.getData2 && item.organization_date == this.state.getData1){
                     arrayData2.push(item)
                     arrayData =  arrayData2
                     
                 }else{
                     if(arrayData2.length == 0){
                         if(item.shift == this.state.getData2 || item.organization_date == this.state.getData1){
                            arrayData3.push(item)
                            arrayData =  arrayData3
                         }
                     }else{
                        arrayData =  arrayData2
                        arrayData3 = []
                     } 
                 }
           return arrayData 
        })
        // console.log(arrayData,arrayData2,arrayData3)

        return (
            <>
                <section className="locator-store" id = "regPart">
                    <div className="obj">
                        <div className="locator-store-title center">
                            <h2>Đăng kí đặt tiệc</h2>
                        </div>
                        <div className="content-contact-inner">
                            <div className="order-party-form">
                                <form>
                                    <div className="email-nCustomer input">
                                        <div className="name label" style={{ flex: '1' }}>
                                            <div><p>Họ và tên:</p></div>
                                            <input type="text" name="name" defaultValue={''} onChange={(event) => this.isChange2(event)} />
                                        </div>
                                        <div className="phone label" style={{ flex: '1' }}>
                                            <div><p>Số tài khoản:</p></div>
                                            <div className="pBank" style={{ display: 'flex'}}>
                                                <input name='stk' type="tel" defaultValue={''}   onChange={(event) => this.isChange2(event)} style={{ flex: '1' }} />
                                                <select defaultValue={'DEFAULT'} name="shif"  style={{ flex: '1' }}>
                                                    <option value="DEFAULT">---bank--- </option>
                                                    {/* {this.props.shiftAp.map(k =>
                                                        <option key={k.id} value={`${k.name},${k.price}`}>{k.name} </option>
                                                    )} */}

                                                </select>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="name-phone input">
                                        <div className="stk label" style={{ flex: '1' }}>
                                            <div><p>Dịch vụ:</p></div>
                                            <div className="time input">
                                                <select defaultValue={'DEFAULT'} name="servic" onClick={(event) => this.isChange2(event)}>
                                                    <option value="DEFAULT">---Select--- </option>
                                                    {this.props.serviceAp.map(x =>
                                                        <option key={x.id} value={x.name}>{x.name} </option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="time-date label" style={{ flex: '1' }}>
                                            <div><p>Sảnh tiệc:</p></div>
                                            <div className="time input">
                                                <select defaultValue={'DEFAULT'} name="wedding_hal" onClick={(event) => this.isChange2(event)}>
                                                    <option value="DEFAULT">---Select--- </option>
                                                    {/* <option value = "1">SảnhI </option>
                                                        <option value = "2">SảnhII </option>
                                                        <option value="3">SảnhIII</option>
                                                        <option value="4">SảnhIII</option> */}
                                                    {this.props.hallAp.map(x =>
                                                        <option key={x.id} value={x.name}>{x.name}</option>
                                                    )}

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" input">
                                        <div className="nCustomer label" style={{ flex: '1' }}>
                                            <div><p>Menu:</p></div>
                                            <div className="time input">
                                                <select defaultValue={'DEFAULT'} name="men" onClick={(event) => this.isChange2(event)}>
                                                    <option value="DEFAULT" >---Select--- </option>
                                                    {this.props.menuAp.map(k =>
                                                        <option key={k.id} value={k.name}>{k.name} </option>
                                                    )}
                                                    {/* <option value = "1">Menu1 </option>
                                                        <option value = "2">Menu2 </option>
                                                        <option value = "3">Menu3 </option>
                                                        <option value="4">Menu4</option> */}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="time-date label" style={{ flex: '1' }}>
                                            <div><p>Thời gian:</p></div>
                                            <div className="time input">
                                                <select defaultValue={'DEFAULT'} name="shif" onClick={(event) => this.isChange2(event)}>
                                                    <option value="DEFAULT">---Ca--- </option>
                                                    {this.props.shiftAp.map(k =>
                                                        <option key={k.id} value={`${k.name},${k.price}`}>{k.name} </option>
                                                    )}

                                                </select>
                                                <div className="date" style={{ marginTop: 0, width: '150px !important' }}>
                                                    <input type="date" defaultValue={''} name="organization_date" onChange={(event) => this.isChange2(event)} style={{ width: '132px ' }} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="textarea label" style={{display: 'flex', alignItems : 'end'}}>
                                        <div className="submit">
                                            <button variant="primary" onClick={this.props.open}>
                                                <p style={{ transform: 'translateY(8px)' }} onClick={this.inPutInfo}>Đăng ký</p></button>
                                        </div>
                                        <button type="reset" variant="secondary" style={{height: '25px'}}
                                             onClick={() => this.isReset()}>Reset</button>
                                    </div>
                                </form>
                                <div className="serchInfo" style={{ width: '100%', marginTop: '50px', padding: '20px' }}>
                                    <InputGroup className="mb-3">
                                        <input type="date" name="sDate" style={{ width: '20px !important' }} onChange={(event) => this.isSeach1(event)} />
                                        <select defaultValue={'DEFAULT'} onChange={(event) => this.isSeach2(event)} >
                                            <option value="DEFAULT"> Ca </option>
                                            {this.props.shiftAp.map(k =>
                                                        <option key={k.id} value={k.id}>{k.name}</option>
                                                    )}
                                            {/* <option value="1">Ca sáng </option>
                                            <option value="2">Ca trưa</option>
                                            <option value="3">Ca tối</option> */}
                                        </select>
                                        <FormControl
                                            type="search" placeholder="Nhập từ khóa tìm kiếm" />
                                        <InputGroup.Append >
                                            <Button style={{ margin: '0' }} variant="info" onClick={(data) => this.getText(this.state.tempData1,this.state.tempData2)}>Tìm</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Name</th>
                                                <th>organization_date</th>
                                                <th>shift</th>
                                                <th>wedding_hall</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {arrayData.map(x => (
                                                <A_Row name={x.name} stt={x.id} date={x.organization_date}
                                                    shift={x.shift} wedding_hall={x.wedding_hall} />
                                            ))}

                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

class A_Row extends React.Component {
    render() {

        return (
            <>
                <tr>
                    <td>{this.props.stt}</td>
                    <td>{this.props.name}</td>
                    <td>{this.props.date}</td>
                    <td>{ `Ca ${this.props.shift}`}</td>
                    <td>{ `Sảnh ${this.props.wedding_hall}`}</td>
                </tr>
            </>
        )
    }
}



export default A_formRegister;