import {React} from "react"
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar1";
import {  useSelector } from "react-redux"


const Dashboard = () => {
    const {loading:authLoading} = useSelector((state) => state.auth);
    
    const {loading:profileLoading} = useSelector((state) => state.auth);

    if(profileLoading || authLoading) {
        return( 
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                Loading...
            </div>
        )
    }
    return(
        <div  className="relative flex min-h-[calc(100vh-3.5rem)]">
            <Sidebar/>

            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
              <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                <Outlet/>
              </div>
            </div>


        </div>
    )
}

export default Dashboard;