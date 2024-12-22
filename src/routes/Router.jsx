import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Assignments from "../pages/Assignments";
import PendingAssignments from "../pages/PendingAssignments";
import CreateAssignments from "../pages/CreateAssignments";
import MyAttemptedAssignments from "../pages/MyAttemptedAssignments";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import UpdateAssignment from "../pages/UpdateAssignment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/assignments",
        element: <Assignments></Assignments>,
      },
      {
        path: "/pending-assignments",
        element: (
          <PrivateRoute>
            <PendingAssignments></PendingAssignments>
          </PrivateRoute>
        ),
      },
      {
        path: "/create-assignments",
        element: (
          <PrivateRoute>
            <CreateAssignments></CreateAssignments>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-attempted-assignments",
        element: (
          <PrivateRoute>
            <MyAttemptedAssignments></MyAttemptedAssignments>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateAssignment></UpdateAssignment>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
