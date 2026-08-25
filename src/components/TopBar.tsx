import { useEffect, useState } from "react";

import { formatCountdown, msUntilEndOfDay, todayLabel } from "@/data/offer";

/**
 * Barra de urgência do topo.
 * O relógio e a data só entram depois de montar no cliente — se fossem
 * renderizados no servidor, o horário do servidor brigaria com o do
 * visitante e o React reclamaria na hidratação.
 */

export function TopBar({ label, countdownLabel }: { label: string; countdownLabel: string }) {
  const [left, setLeft] = useState<number | null>(null);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(todayLabel());
    setLeft(msUntilEndOfDay());
    const id = window.setInterval(() => setLeft(msUntilEndOfDay()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-[980px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-2.5 text-center">
        <span className="text-[0.78rem] font-medium tracking-wide">
          ⚡ {label} {today}
        </span>
        {left !== null && (
          <>
            <span className="hidden opacity-50 sm:inline" aria-hidden>
              •
            </span>
            <span className="text-[0.78rem] tabular-nums">
              {countdownLabel}{" "}
              <strong className="font-price font-bold">{formatCountdown(left)}</strong>
            </span>
          </>
        )}
      </div>
    </div>
  );
}
