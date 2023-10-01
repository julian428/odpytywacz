import H2 from "../ui/headings/h2";

interface Props {
  stats: {
    currentPercentage: number;
    prevPercentage: number;
    candidateErrors: string[];
    avgPercentage: number;
    prevTime: number;
    avgTime: number;
    currentTime: number;
    mostErrors: string[];
  };
}

export default function RadialStats({ stats }: Props) {
  const improvement = stats.currentPercentage - stats.prevPercentage;

  const currentMinutes = Math.floor(stats.currentTime / 60000);
  const currentSeconds = Math.round((stats.currentTime % 60000) / 1000);

  const timeImprovement = Math.round(
    ((stats.prevTime - stats.currentTime) / stats.prevTime) * 100
  );

  return (
    <section className="lg:space-x-40 flex flex-wrap justify-center">
      <div
        className="radial-progress text-color4 lg:scale-100 scale-75"
        style={{ "--value": stats.currentPercentage, "--size": "12rem" } as any}
      >
        <section className="text-white scale-90">
          <H2>{stats.currentPercentage}%</H2>
          <p className="opacity-50 text-right">{`${
            improvement >= 0 ? "+" : ""
          }${improvement}%`}</p>
        </section>
      </div>
      <div
        className="radial-progress text-color3 lg:scale-100 scale-75"
        style={
          {
            "--value": timeImprovement < 0 ? 0 : timeImprovement,
            "--size": "12rem",
          } as any
        }
      >
        <section className="text-white scale-90">
          <H2>{currentMinutes}min</H2>
          <p className="opacity-50 text-right">{currentSeconds}s</p>
        </section>
      </div>
    </section>
  );
}
