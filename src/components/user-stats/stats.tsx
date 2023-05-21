import H3 from "../ui/headings/h3";

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

const getTimeImprovement = (
  minutes: number,
  pMinutes: number,
  seconds: number,
  pSeconds: number
) => {
  const pTime = pMinutes * 60 + pSeconds;
  const time = minutes * 60 + seconds;

  const timeDiffernece = pTime - time;

  const text = `${Math.floor(Math.abs(timeDiffernece) / 60000)}min ${Math.round(
    Math.abs(timeDiffernece) % 60000
  )}s ${timeDiffernece < 0 ? "wolniej" : "szybciej"}`;

  return text;
};

export default function Stats({ stats }: Props) {
  const currentMinutes = Math.floor(stats.currentTime / 60000);
  const currentSeconds = Math.round((stats.currentTime % 60000) / 1000);
  const prevMinutes = Math.floor(stats.prevTime / 60000);
  const prevSeconds = Math.round((stats.prevTime % 60000) / 1000);
  const avgMinutes = Math.floor(stats.avgTime / 60000);
  const avgSeconds = Math.round((stats.avgTime % 60000) / 1000);

  const improvement = stats.currentPercentage - stats.prevPercentage;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="bg-gradient-to-b from-color3 to-color2 text-transparent bg-clip-text font-bold">
          <H3>
            {Math.abs(improvement)}%{" "}
            {stats.currentPercentage < stats.prevPercentage
              ? "pogorszenia"
              : "poprawy"}
          </H3>
        </div>
        <H3> od ostatniego razu</H3>
      </div>
      <div className="flex gap-2">
        <div className="bg-gradient-to-b from-color3 to-color2 text-transparent bg-clip-text font-bold">
          <H3>
            {getTimeImprovement(
              currentMinutes,
              prevMinutes,
              currentSeconds,
              prevSeconds
            )}
          </H3>
        </div>
        <H3> niż ostatnio</H3>
      </div>
      <div className="flex gap-2">
        <H3>popełniłeś</H3>
        <div className="bg-gradient-to-b from-color3 to-color2 text-transparent bg-clip-text font-bold">
          <H3>{stats.candidateErrors.length} błędów</H3>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="bg-gradient-to-b from-color3 to-color2 text-transparent bg-clip-text font-bold">
          <H3>{stats.avgPercentage}%</H3>
        </div>
        <H3>to twój</H3>
        <div className="bg-gradient-to-b from-color3 to-color2 text-transparent bg-clip-text font-bold">
          <H3>przeciętny wynik</H3>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="bg-gradient-to-b from-color3 to-color2 text-transparent bg-clip-text font-bold">
          <H3>
            {avgMinutes}min {avgSeconds}s
          </H3>
        </div>
        <H3>to twój</H3>
        <div className="bg-gradient-to-b from-color3 to-color2 text-transparent bg-clip-text font-bold">
          <H3>przeciętny</H3>
        </div>
        <H3>czas</H3>
      </div>
    </section>
  );
}
