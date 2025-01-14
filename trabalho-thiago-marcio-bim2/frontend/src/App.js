import React from "react";
import { Route,Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecordList from "./components/RecordList";
import Edit from "@babel/core";
import Create from "./components/Create";

const App = () => {
    return(
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<RecordList />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </div>
    )
}