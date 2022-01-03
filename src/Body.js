import React from 'react'
import API, { endpoints } from './API'
import { Link } from 'react-router-dom'
import { Card, Pagination, Col, Row, Container } from 'react-bootstrap'

class Body extends React.Component {
    constructor() {
        super()
        this.state = {
            'foods': [],
            'count': 0
        }
    }

    loadFoods = (page = "?page=1") => {
        API.get(`${endpoints['foods']}${page}`).then(res => {
            this.setState({
                'foods': res.data.results,
                'count': res.data.count
            })
        })
    }

    componentDidMount() {
        this.loadFoods()
    }

    componentDidUpdate() {
        this.loadFoods(this.props.location.search)
    }

    render() {
        let items = []
        for (let i = 0; i < Math.ceil(this.state.count / 6); i++)
            items.push(
                <Pagination.Item><Link to={"/?page=" + (i + 1)}>{i + 1}</Link></Pagination.Item>
            )
        return (
            <>
            <Container style={{marginBottom: '20px'}}>
                <div>
                <section className="block-introduce">
                    <div className="block-introduce-title center">
                        <h2>Giới thiệu chung</h2>
                    </div>
                    <div className="block-introduce-title-small">
                        <p>Được thành lập vào năm 2009,
                            với định hướng kinh doanh trở thành đơn vị tổ chức sự kiện và tiệc cưới hàng đầu, cung cấp những không gian sang trọng, tinh tế,
                            đặc sắc cùng chất lượng dịch vụ chuyên nghiệp bậc nhất miền Bắc</p>
                        <p>Đến nay, sau hơn 10 năm phát triển Trống Đồng Palace đã sở hữu cho mình 12 trung tâm tổ chức Sự kiện và Tiệc cưới sang trọng tọa lạc tại các vị trí đắc địa trong toàn thành phố Hà Nội và các tỉnh lân cận. Là sự lựa chọn hàng đầu cho mọi khách hàng mỗi khi có nhu cầu tổ chức tiệc.</p>
                        <p>Các trung tâm nằm trong Hệ thống của Trống Đồng Palace có sức chứa linh hoạt, đảm bảo khả năng phục vụ từ 50 -1500 khách, phù hợp để tổ chức nhiều loại sự kiện khác nhau. Hiện nay, Trống Đồng Palace cung cấp đến cho khách hàng đa dạng loại các loại hình dịch vụ như: Dịch vụ Tiệc Cưới, Dịch vụ Hội Nghị - Hội Thảo, Dịch vụ tiệc Outside Catering, Dịch vụ tiệc Sinh Nhật, Dịch vụ Wedding Planner.</p>
                        <p>Chúng tôi tin với năng lực của mình, chúng tôi sẽ đáp ứng mọi yêu cầu khắt khe nhất của quý khách hàng và mang lại sự thành công rực rỡ cho tất cả các sự kiện mà khách hàng đã đặt niềm tin vào Trống Đồng Palace.</p>
                    </div>
                </section>
            </div>
                <h1 className="text-center text-danger"> Ẩm thực đặc sắc</h1>
                
                <Row>
                    {this.state.foods.map(m => <Amenu food={m} />)}
                </Row>
                </Container>
            </>
        )
    }
}

class Amenu extends React.Component {
    render() {
        return (
          <Col md={6} id={this.props.food.id}>
                <Card style={{ width: '32rem', marginTop: '50px' }}>
                    <Card.Img variant="top" src={this.props.food.image} />
                    <p style={{ textAlign: 'center',fontSize: '20px' }}>{this.props.food.name}</p>
                </Card>
            </Col>
        )
    }
}

export default Body