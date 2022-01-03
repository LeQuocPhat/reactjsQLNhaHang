import React from 'react';
import A_menu from './A_menu';
import A_service from './A_service';
import A_spaces from './A_spaces';
import { Route, Switch } from 'react-router-dom';
import Body from './Body';
import A_reports from './A_ reports';
import ServiceDetail from './ServiceDetail';
import HallDetail from './HallDetail';



class A_URL extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Body} />
                    <Route exact path="/Service" component={A_service} />
                    <Route exact path="/Banquet hall" component={A_spaces} />
                    <Route exact path="/Menu" component={A_menu} />
                    <Route exact path="/Chart" component={A_reports} />
                    <Route exact path="/Recruitment" component={Body} />
                    {/* <Route exact path="/register" component={A_Register} /> */}
                    {/* <Route exact path="/login" component={A_login} /> */}
                    <Route exact path="/Service/:serviceId/" component={ServiceDetail} />
                    <Route exact path="/Banquet hall/:hallId/" component={HallDetail} />
                </Switch>
            </div>
        );
    }
}

export default A_URL;