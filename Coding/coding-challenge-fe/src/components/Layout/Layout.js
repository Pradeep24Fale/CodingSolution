import React from 'react';
import PublicLayout from "./publicLayout/publicLayout";
import PrivateLayout from "./privateLayout/privateLayout";
import  {Route, Switch} from "react-router-dom";
import SignIn from "../sign-in/SignIn";
import Employee from "../Admin/employee-mgmt/Employee";
import Review from "../Admin/Review-mgmt/Review";
import {useAuth } from "../../Context/auth";
import EmployeeInfo from "../Admin/employee-mgmt/EmployeeInfo";
import ReviewInfo from "../Admin/Review-mgmt/ReviewInfo";
import EmployeeReview from "../Employee/EmployeeReview";


function Layout() {
    const {user} = useAuth();
    const userObject = typeof user === 'string' ? JSON.parse(user): user
    return (
        <div>
            {
                !userObject
                ?<PublicLayout>
                        <Switch>
                            <Route path="/">
                                <SignIn/>
                            </Route>
                        </Switch>
                </PublicLayout>
                :
                    <PrivateLayout user={userObject}>
                        {
                            Number(userObject.admin) === 1
                            ? <Switch>
                                <Route exact path="/">
                                    <h1>This is Home Page </h1>
                                </Route>
                                <Route exact path="/review-mgmt">
                                    <Review/>
                                </Route>
                                <Route exact path="/review-mgmt/:id">
                                    <ReviewInfo/>
                                </Route>
                                <Route exact path="/employee-mgmt" render={() => <Employee/>}/>
                                <Route exact path="/employee-mgmt/:id">
                                    <EmployeeInfo/>
                                </Route>
                            </Switch>
                                : <Switch>
                                    <Route exact path="/">
                                        <EmployeeReview user={userObject}/>
                                    </Route>
                                </Switch>
                        }
                    </PrivateLayout>
            }
        </div>
    );
}

export default Layout;
