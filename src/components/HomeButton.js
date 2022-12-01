import { useNavigate } from "react-router-dom";
import '../homepage.css'

export function HomeButton(){
    const navigate = useNavigate()

    return(
        <img
                src={require("../pages/playground_assets/homebutton14212-q7ta-200h.png")}
                alt="homebutton14212"
                className="create-task-homebutton1"
                onClick={() => {navigate('/home')}}
        />
    )
}