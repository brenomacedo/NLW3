import React, { useContext, useEffect } from 'react'
import { Route, BrowserRouter, Redirect, Switch, useHistory } from 'react-router-dom'
import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import RedefinePassword from './pages/RedefinePassword'
import DashboardCreated from './pages/DashboardCreated'
import DashboardPending from './pages/DashboardPending'
import EditOrphanage from './pages/EditOrphanage'
import VerifyOrphanage from './pages/VerifyOrphanage'
import UserContext from './contexts/UserContext'
import api from './services/api'


const Routes = () => {

    const User = useContext(UserContext)

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/login" exact component={Login} />
                <Route path="/forgot-password" exact component={ForgotPassword} />
                <Route path="/forgot-password/redefine" exact component={RedefinePassword} />
                <Route path="/app" exact component={OrphanagesMap} />
                <Route path="/orphanages/create" exact component={CreateOrphanage} />
                <Route path="/orphanage/:id" exact component={Orphanage} />


                {User.isAuth && (
                    <>
                    <Route path="/dashboard-created" exact component={DashboardCreated} />
                    <Route path="/dashboard-pending" exact component={DashboardPending} />
                    <Route path="/edit-orphanage" exact component={EditOrphanage} />
                    <Route path="/verify-orphanage" exact component={VerifyOrphanage} />
                    </>
                )}

                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes