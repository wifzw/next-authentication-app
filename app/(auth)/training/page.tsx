import { redirect } from "next/navigation";

import { verifyAuth } from "@/lib/auth";
import { getTrainings } from "@/lib/training";
import { ITraining } from "@/lib/types";

export default async function TrainingPage() {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  const trainingSessions: ITraining[] = getTrainings();

  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul id="training-sessions">
        {trainingSessions.map((training) => (
          <li key={training.id}>
            <img src={`/trainings/${training.image}`} alt={training.title} />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
