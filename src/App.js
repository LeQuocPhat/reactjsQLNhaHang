import './App.css';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import A_header from './A_header';
import A_URL from './A_URL';
import API, { endpoints } from './API';
import cookies from 'react-cookies';
import A_formRegister from './A_formRegister';
import { Button, Modal } from 'react-bootstrap';
import A_modal from './A_modal';
import A_login from './A_login';
import A_Register from './A_Register';
import A_reports from './A_ reports';
// import Comment from './Comment';

export let UserContext = React.createContext()

export default function App(props) {
  const [user, setUser] = useState(null)

  const [Hall, setHall] = useState([])
  const [Shift, setShift] = useState([])
  const [Service, setService] = useState([])
  const [Menu, setMenu] = useState([])
  const [Bank, setBank] = useState([])

  const [InFo, setInFo] = useState(null)

  var [Re, setRe] = useState(false)


  const [modalShow, setModalShow] = React.useState(false);
  const [lgShow, setLgShow] = useState(false);
  const handleClose = () => {
    setLgShow(false)
  };
  const handleShow = (event) =>  {
    event.preventDefault()
    setLgShow(true);

  };

  // const handleShow = (event) => {
  //   event.preventDefault()
  //   setLgShow(true)
  // };



  useEffect(() => {
    async function fetchData() {
      try {
        let wHall = await API.get(endpoints['weddinghalls'])
        setHall(wHall.data.results)
        let wMenu = await API.get(endpoints['menus'])
        setMenu(wMenu.data.results)
        let wService = await API.get(endpoints['services'])
        setService(wService.data.results)
        let wShift = await API.get(endpoints['shift'])
        setShift(wShift.data)
        let wStk = await API.get(endpoints['bankAccount'])
        setBank(wStk.data)
      } catch (error) { console.error(error) }
    }
    fetchData();
  }, []);
  const infWed = (info) => {
    setInFo(info)
    // console.log("ket nối r ok ok")
  
  }
  const pushData = () => {
    var mainData = {}
    mainData.name = InFo.name
    mainData.organization_date = InFo.organization_date

    {Shift.map(s => {
      if (s.name.indexOf(InFo.shift.name) !== -1)
        mainData.shift = s.id
    })}
  {Menu.map(m => {
      if (m.name.indexOf(InFo.menu.name) !== -1)
        mainData.menu = m.id
    })}
  {Hall.map(h => {
      if (h.name.indexOf(InFo.wedding_hall.name) !== -1)
        mainData.wedding_hall = h.id
    })}

    {Bank.map(b => {
      if ((b.number == InFo.stk) != false){
        mainData.stk = b.id
      }
    })}
    
    console.log(mainData)
    API.post(endpoints['weddings'], mainData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.info(res)
      alert("Đăng ký thành công!")
    }).catch(err => {
      console.error(err)
    })

  }

  const Regis = (data) => {
    // console.log(data)
    // {data.indexOf('Register') !== -1?true:false}
    {
      if (data.indexOf("Registe") !== -1)
        return setRe(true)
      return setRe(false)
    }
  }
  // console.log(Re)


  const login = async (username, password) => {
    let res = await API.post(endpoints['login'], {
      'client_id': 'acvDKSS5EAW9lMHHmXlhZmoZwjUDmy3gDJPWYNFd',
      'client_secret': 'X9TncnD0EXmxWmRZZZuxVJt3eukwSyY6yIaLacggqAVNjT4A6IKIkvOjsuY8aVcNUHtOk7UKFPdYxWYW1zP5ZJMiUhBSW4wTY7fd1QPULQMZOH1QQi9bWfUDd4rMBooH',
      'username': username,
      'password': password,
      'grant_type': 'password'
    }).then((res)=>{
		  	cookies.save("access_token",res.data.access_token)
		}).catch(err =>{console.error(err)
		  alert("Incorrect account or password")
		})
    
    if(cookies.load("access_token") != null){
      let user = await API.get(endpoints['current-user'], {
        headers: {
          'Authorization': `Bearer ${cookies.load('access_token')}`
        }
      })
      cookies.save("user", user.data)
      setUser(user)
    }else{
      return ;
    }
    // console.info(user.data)
    // props.history("/") 
  }

  return (
    <UserContext.Provider value={{ user, login }}>
      <BrowserRouter>
        <div>
          <A_header openFLogin={() => setModalShow(true)}
            putAtt={(data) => Regis(data)}
          />
          <A_URL />
          {/* <Comment/> */}
          <A_formRegister
            getIf={(info) => infWed(info)}
            open={handleShow}
            hallAp={Hall}
            shiftAp={Shift}
            menuAp={Menu}
            serviceAp={Service}
          />
          {/* <A_reports/> */}
        </div>

        <>
          <Modal show={lgShow} onHide={handleClose}
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton id="example-modal-sizes-title-lg">
              <Modal.Title className="text-center" style={{width: '100%'}}>Confirm your information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <A_modal temInfo={InFo} />
            </Modal.Body>
            <Modal.Footer>
              <Button style={{ margin: "0" }} variant="primary" onClick={handleClose}>
                <p onClick={() => pushData()}>Thanh toán</p>
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Hủy
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={(dat) => setModalShow(dat)}
            Re={Re} 
        />
      </BrowserRouter>

    </UserContext.Provider>

  )
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title  id="contained-modal-title-vcenter">
          <h1 class="text-center text-danger">ĐĂNG NHẬP</h1>
        </Modal.Title>
        </Modal.Header> */}
      <Modal.Body >
        {/* {props.Re } */}
        {(props.Re == undefined || props.Re !== true) ? <A_login hideForm={(data) => props.onHide(data)} /> : <A_Register hideForm={(data) => props.onHide(data)}/>}


      </Modal.Body>
    </Modal>
  );
}


