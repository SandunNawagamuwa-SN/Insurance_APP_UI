import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContext } from "./Context/AppContext";
import { useContext } from "react";

import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Register from "./Pages/Auth/Register";
import Create from './Pages/InsurancePolicies/Create';
import './App.css';
import SignIn from './Pages/Auth/SignIn';
import Show from './Pages/InsurancePolicies/Show';
import Edit from './Pages/InsurancePolicies/Edit';
import PageNotFound from './Pages/PageNotFound';

export default function App() {
    const { user } = useContext(AppContext)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route path='/register' element={user ? <Home /> : <Register />} />
                    <Route path='/login' element={user ? <Home /> : <SignIn />} />
                    <Route path='/create' element={user ? <Create /> : <SignIn />} />
                    <Route path="/insurancePolicies/view/:id" element={<Show />} />
                    <Route path="/insurancePolicies/edit/:id" element={user ? <Edit /> : <SignIn />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
