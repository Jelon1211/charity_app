import formatAmount from "../helpers/formatAmount";

type ProgressBarProps = {
  goal: number;
  thisYearAmount: number;
};

export default function ProgressBar({ goal, thisYearAmount }: ProgressBarProps) {
  const progress = Math.min(((thisYearAmount / 100) / goal) * 100, 100);

  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-center mb-2">
        W tym roku udało nam się już przekazać{" "}
        <span className="font-bold">{formatAmount(thisYearAmount)}</span>.
        Do końca roku celuję w{" "}
        <span className="font-bold">{goal} zł</span>.
      </p>


      <div className="w-full h-4 bg-[var(--bgs)] rounded overflow-hidden">
        <div
          className="h-full bg-[var(--colorsecond)] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
