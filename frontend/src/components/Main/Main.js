import { Route, Routes } from "react-router-dom";
import ProjectList from "../ProjectList";
import TaskTable from "../TaskList";
import Login from "../Login";
import React from "react";

const Main=()=>{

    const error = () => <div>Error</div>;

    return(

        <Routes>
            <Route path="/" Component={Login}/>
            <Route path="/projects" Component={ProjectList}/>
            <Route path="/tasks/:projectID" Component={TaskTable}/>
            <Route render={error} />
        </Routes>
    )
}

export default Main;