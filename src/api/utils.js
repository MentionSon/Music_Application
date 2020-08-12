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

export const getName = (list) => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;

export const getSongUrl = (id) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

export const formatPlayTime = (interval) => {
  interval = interval | 0; // |0表示向下取整
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};
