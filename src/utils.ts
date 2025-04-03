interface Time {
  Y: string,
  M: string,
  D: string,
  H: string,
  m: string,
  s: string
}

if (!Date.now) Date.now = () => new Date().getTime();

export const // 

  // strings utils

  addZeros = (str: string | number, maxlen = 2): string => {
    str = '' + str;
    while (str.length < maxlen)
      str = "0" + str;
    return str;
  },

  shebang_to_type = (shebang: string): string => {
    if (/(^#!\/)|(^<?)/.test(shebang.trim()))
      return "text/plain";
    return "";
  },

// date utils

time = (t: number | Function = 0) => {

  const // 
    cb: Function = typeof t === 'number' ? (o) => o : t,
    time = typeof t === 'number' ? t : 0,
    date = time ? new Date(time) : new Date(),
    Y = '' + date.getFullYear(),
    M = addZeros(date.getMonth() + 1, 2),
    D = addZeros(date.getDate(), 2),
    H = addZeros(date.getHours(), 2),
    m = addZeros(date.getMinutes(), 2),
    s = addZeros(date.getSeconds(), 2);
  return cb({ Y, M, D, H, m, s });
},

  time_format = (timestamp: number) => {
    const { Y, M, D, H, m }: Time = time(timestamp);
    return `${D}/${M}/${Y} ${H}:${m}`;
  }