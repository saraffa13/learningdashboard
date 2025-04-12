import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SkillAssessment from "../pages/assessment/SkillAssessment";
import Assessment from "../pages/assessment/Assessment";
import AssessmentResult from "../pages/assessment/AssessmentResult";
import ContentFeed from "../pages/content/ContentFeed";
import ProfileManager from "../pages/profile/ProfileManager";
import Layout from "../components/Layout";
import NotFound from "../pages/error/NotFound";

const AllRoutes = () => {
    const routes = createBrowserRouter([
        {
            path:'/',
            element:<Layout />,
            children:[
                {
                    index:true,
                    element:<ContentFeed />
                },
                {
                    path:'assessment',
                    children: [
                        {
                            index: true,
                            element:<SkillAssessment />
                        },
                        {
                            path:':assessmentId',
                            element:<Assessment />
                        },
                        {
                            path:'result/:resultId',
                            element:<AssessmentResult />
                        }
                    ]
                },
                {
                    path:'content',
                    element:<ContentFeed />
                },
                {
                    path:'profile',
                    element:<ProfileManager />
                }
            ]
        },
        {
            path:'*',
            element:<NotFound />
        }
    ]);

    return <RouterProvider router={routes} />;
};

export default AllRoutes;