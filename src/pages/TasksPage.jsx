import { useDispatch, useSelector } from "react-redux";
import AppBar from "../components/AppBar/AppBar";
import { TaskList } from "../components/TaskList/TaskList";
import { getIsLoading } from "../redux/selectors";
import { useEffect } from "react";
import { fetchTasks } from "../redux/operations";

export const TasksPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <main
     style={{padding:"50px"}}
    >
      <AppBar />
      {isLoading && "In progress..."}
      <TaskList />
    </main>
  );
};
