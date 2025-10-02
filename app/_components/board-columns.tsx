import GoalColumn from "./goal/goal-column";
import { GoalWithTasks } from "@/lib/types/goal";

type Props = {
  goalsList: GoalWithTasks[];
};

export default function BoardColumns({ goalsList }: Props) {
  if (!goalsList.length) {
    return (
      <div className="flex items-center justify-center h-full text-muted-500">
        No goals yet, create one to get started 🚀
      </div>
    );
  }
  console.log({ goalsList });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {goalsList.map((goal) => (
        <GoalColumn key={goal.id} goalInfo={goal} />
      ))}
    </div>
  );
}
