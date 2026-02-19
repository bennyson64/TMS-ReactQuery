import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useTaskStore } from "@/store/taskStore";
import { useQuery } from "@tanstack/react-query";

type Task = {
  id: string;
  title: string;
  description: string;
};

export default function DisplayForm() {
  // // const tasks = useTaskStore((state) => state.tasks);
  // const [tasks, setTasks] = useState<Task[]>([])   // ← local state, no store

  // useEffect(() => {
  // async function fetchTasks() {
  //   const res = await fetch("http://localhost:3000/")
  //   const data = await res.json()
  //   setTasks(data)
  //   }

  //   fetchTasks()                        // ← fetch on mount
  //   const interval = setInterval(fetchTasks, 3000)  // ← poll every 3s to pick up new tasks
  //   return () => clearInterval(interval)
  // }, [])
  //replacable with tanstack query
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch("https://taskmanagement-system-backend.vercel.app/");
      return res.json() as Promise<Task[]>;
    },
  });
  if(isLoading) return <Card className="w-full sm:max-w-md">
        <CardContent className="pt-6 text-muted-foreground">
          Loading...
        </CardContent>
      </Card>
  if(error) return <Card className="w-full sm:max-w-md">
        <CardContent className="pt-6 text-muted-foreground">
          Error Occured: Error Retriving Data
        </CardContent>
      </Card>

  if (tasks.length === 0) {
    return (
      <Card className="w-full sm:max-w-md">
        <CardContent className="pt-6 text-muted-foreground">
          No task submitted yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Submitted Task</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="border rounded-md p-3 space-y-1">
            <div>
              <h3 className="font-semibold">Task Title</h3>
              <p>{task.title}</p>
            </div>
            <div>
              <h3 className="font-semibold">Task Description</h3>
              <p className="text-muted-foreground">{task.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
