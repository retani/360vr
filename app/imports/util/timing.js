function getCurrentTime(state, asset) {
  if (!state) return null;
  const { transport="stopped", startedAt, pausedAt, offset=0 } = state;
  if (transport === "playing") {
    return TimeSync.serverTime() - startedAt;
  } else if (transport === "paused") {
    return offset;
  } else if (transport === "stopped") {
    return 0;
  } 
}

export {
  getCurrentTime
}