import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import SkillAssessment from "../pages/assessment/SkillAssessment";
import ContentFeed from "../pages/content/ContentFeed";
import ProfileManager from "../pages/profile/ProfileManager";
import Layout from "../components/Layout";


const AllRoutes = () => {
    const routes = createBrowserRouter([
        {
            path:'/',
            element:<Layout /> ,
            children:[
                {
                    index:true,
                    element:<Home />
                },
                {
                    path:'/assessment',
                    element:<SkillAssessment />
                },
                {
                    path:'/content',
                    element:<ContentFeed />
                },
                {
                    path:'/profile',
                    element:<ProfileManager />
                }
            ]
        }
    ])

    return  <RouterProvider router={routes} />
}

export default AllRoutes;