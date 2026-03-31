export function maybeResetUsage(tool) {
  if (!tool.metadata.isAI) return tool;

  if (!tool.usage.resetTime) return tool;

  const now = new Date();
  const today = now.toISOString().split("T")[0];

  if (tool.usage.lastReset?.startsWith(today)) {
    return tool;
  }

  const [h, m] = tool.usage.resetTime.split(":");

  const resetDate = new Date();
  resetDate.setHours(h, m, 0, 0);

  if (now >= resetDate) {
    tool.usage.used = 0;
    tool.usage.lastReset = now.toISOString();
  }

  return tool;
}