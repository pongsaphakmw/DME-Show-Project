import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "./NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import firebaseApp from "./InitFirebase";

function ProfilePage(){
    const navigate = useNavigate();
    const stateLocation = useLocation();

    return (
        <div className="Profile">
            <Navigation />
        </div>
    )
}

export default ProfilePage;