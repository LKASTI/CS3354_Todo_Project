import {useContext} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import '../homepage.css'
import '../style.css'
import React from 'react'
import App, { AppContext } from '../App'

function Home(props){
    const {username} = useContext(AppContext)
    const navigate = useNavigate()
    if(!username)
    {
        return(
            <div>
                <h1>PLEASE LOGIN TO ACCESS HOME</h1>
                <button onClick={() =>{navigate("/login")}}>Login Page</button>
            </div>
        )
    }
    return(
        <div className="homepage-container">
            <div className="homepage-homepage">
                <img
                    src={require("./playground_assets/animesceneryahd1eqpvwq8aoofp14204-tpj-700h.png")}
                    alt="animesceneryahd1eqpvwq8aoofp14204"
                    className="homepage-animesceneryahd1eqpvwq8aoofp1"
                />
                <span className="homepage-text01">
                    <span>{username}</span>
                </span>
                <img
                    src={require("./playground_assets/levelicon4214-q7ph-200h.png")}
                    alt="LevelIcon4214"
                    className="homepage-level-icon"
                />
                <img
                    src={require("./playground_assets/coinicon4191-avb7r-200w.png")}
                    alt="CoinIcon4191"
                    className="homepage-coin-icon"
                />
                <img
                    src={require("./playground_assets/expbar4191-evvk-200h.png")}
                    alt="ExpBar4191"
                    className="homepage-exp-bar"
                />
                <img
                    src={require("./playground_assets/settingsicon4192-0yuo-200h.png")}
                    alt="SettingsIcon4192"
                    className="homepage-settings-icon"
                />
                <div className="homepage-create-task-group">
                    <span className="homepage-text05">+</span>
                    <img
                        src={require("./playground_assets/handdrawndiamond896114192-zm1m-200h.png")}
                        alt="handdrawndiamond896114192"
                        className="homepage-handdrawndiamond89611"
                    />
                </div>
                <div className="homepage-shop-group">
                    <span className="homepage-text06">
                        <span>Shop</span>
                    </span>
                    <img
                        src={require("./playground_assets/shopicon4193-rp2i-200h.png")}
                        alt="ShopIcon4193"
                        className="homepage-shop-icon"
                    />
                </div>
                <div className="homepage-profilegroup">
                    <span className="homepage-text08">
                        <span>Profile</span>
                    </span>
                    <img
                        src={require("./playground_assets/profileicon4193-xg8q-200w.png")}
                        alt="ProfileIcon4193"
                        className="homepage-profile-icon"
                    />
                </div>
                <div className="homepage-to-do-group">
                    <span className="homepage-text10">
                        <span>To-Do</span>
                    </span>
                    
                    <button className='todo-button' >
                            <img
                            onClick={() => {navigate("/todolist")}}
                            src={require("./playground_assets/todoicon4194-qvxa-200w.png")}
                            alt="ToDoIcon4194"
                            className="homepage-to-do-icon"
                        />
                    </button>
                </div>
                <div className="homepage-completed-group">
                    <span className="homepage-text12">
                        <span>Completed</span>
                    </span>
                    <img
                        src={require("./playground_assets/completedicon4194-qb1q-200w.png")}
                        alt="CompletedIcon4194"
                        className="homepage-completed-icon"
                    />
                </div>
                <img
                    src={require("./playground_assets/avatar4194-9ovm-300w.png")}
                    alt="Avatar4194"
                    className="homepage-avatar"
                />
            </div>
        </div>
    )
}

export default Home