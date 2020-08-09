export const getCount = (count) => {
  if (count < 0) return;
  if (count < 1000) {
    return count;
  } else if (Math.floor(count / 1000) < 1000) {
    return Math.floor(count / 1000) / 10 + "T";
  } else {
    return Math.floor(count / 1000000) + "M";
  }
};

export const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout();
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};

export const filterIndex = (rankList) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};
