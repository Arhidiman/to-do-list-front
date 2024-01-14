import {Route, Routes} from "react-router-dom"
import {BrowserRouter as Router} from "react-router-dom";
import {AuthPage} from "@/pages/AuthPage";
import {TodoPage} from "@/pages/TodoPage";
import {routes} from "@/constants/routes.ts";

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path={routes.auth} element={<AuthPage/>}/>
                <Route path={routes.todos} element={<TodoPage/>}/>
            </Routes>
        </Router>
    )
}