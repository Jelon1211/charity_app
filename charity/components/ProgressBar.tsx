type ProgressBarProps = {
  goal: number;
  current: number;
};

export default function ProgressBar({ goal, current }: ProgressBarProps) {
  const progress = Math.min((current / goal) * 100, 100);

  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-center mb-2">
        Planuję przekazać <span className="font-bold">{goal} zł</span> do końca
        roku
      </p>

      <div className="w-full h-4 bg-[var(--colorsecond)] rounded overflow-hidden">
        <div
          className="h-full bg-[var(--bgs)] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
