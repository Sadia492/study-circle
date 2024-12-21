import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Assignments from "../pages/Assignments";
import PendingAssignments from "../pages/PendingAssignments";
import CreateAssignments from "../pages/CreateAssignments";
import MyAttemptedAssignments from "../pages/MyAttemptedAssignments";
import Home from "../pages/Home";

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
        element: <PendingAssignments></PendingAssignments>,
      },
      {
        path: "/create-assignments",
        element: <CreateAssignments></CreateAssignments>,
      },
      {
        path: "/my-attempted-assignments",
        element: <MyAttemptedAssignments></MyAttemptedAssignments>,
      },
    ],
  },
]);
export default router;
