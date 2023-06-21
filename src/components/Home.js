
import { BrowserRouter, Route, Link } from "react-router-dom/cjs/react-router-dom.min"

import Logout from "./Logout"

const Home = () => {

    let LoggedIn = localStorage.getItem('LoggedIn')
    let Username = localStorage.getItem('Username')
    console.log(Username)

    if (LoggedIn === "TRUE") {
        return (
            <section id="Homepage">
                <div id="Profile">
                    <h3>Welcome Back, {Username}</h3>
                </div>
                <div id="Inbox">
                    <h2>Inbox</h2>
                </div>
                <div id="Sent">
                    <h2>Sent</h2>
                </div>
            </section>
        )
    } else {
    return (
        <Logout />
    )
}
}



export default Home