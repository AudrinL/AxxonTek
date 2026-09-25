import "server-only";

/**
 * The smallest useful structured logger.
 *
 * One JSON line per event, so whatever collects stdout in production (the
 * platform's log drain) can filter and alert on `level` and `event` without
 * parsing prose. It is intentionally tiny: no transport, no dependency, no
 * buffering. When a real log sink or APM is added, this is the one place to
 * point it at.
 */
type Level = "info" | "warn" | "error";

function emit(level: Level, event: string, data?: Record<string, unknown>) {
  const line = JSON.stringify({
    level,
    event,
    at: new Date().toISOString(),
    ...data,
  });
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const log = {
  info: (event: string, data?: Record<string, unknown>) => emit("info", event, data),
  warn: (event: string, data?: Record<string, unknown>) => emit("warn", event, data),
  error: (event: string, data?: Record<string, unknown>) => emit("error", event, data),
};
