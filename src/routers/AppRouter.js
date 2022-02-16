import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Navigate } from 'react-router'
import NotFoundPage from '../views/NotFound';
import Characters from "../views/Characters/Characters"
import CharacterDetails from "../views/CharacterDetails/ChracterDetails"

const AppRouter = () => (
    <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Navigate replace to="/page/1" />}/>
                <Route exact path="/page/:pageNumber" element={<Characters/>}/>
                <Route exact path="/page/:pageNumber/character/:characterId" element={<CharacterDetails/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
    </BrowserRouter>
);

export default AppRouter;
