export function wait (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export async function nextTick () {
  await wait(0);
}
