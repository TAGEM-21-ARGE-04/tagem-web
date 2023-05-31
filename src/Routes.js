import AppLayout from "pages/Layout";
import NotFound from "pages/NotFound";
import PrivateRoute from "component/PrivateRoute";
import Home from "pages/Home";
import Details from "pages/Details";

export const Routes = 
[
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/details/:id", 
                element: <Details />   
            }
        ],
    },
    {
        path: "*",
        element: <NotFound />
    }
];

const routesMapper = (routes) => 
{
    return routes.map(route => {
        if(route.auth)
        {
            route.element = (
                <PrivateRoute roles={route.roles || undefined}>{route.element}</PrivateRoute>
            )
        }
        if(route.children)
        {
            route.children = routesMapper(route.children);
        }
        return route;
    });
}

routesMapper(Routes);