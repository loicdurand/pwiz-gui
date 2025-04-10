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

  escapeHTML = (str: String): string => {
    const escape: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, (m: string) => {
      return escape[m];
    });
  },

  noAccent = (str: string): string => {

    str ||= '';

    const // 
      accents: RegExp[] = [
        /[\u00C0-\u00C6]/g, /[\u00E0-\u00E6]/g, // A, a
        /[\u00C8-\u00CB]/g, /[\u00E8-\u00EB]/g, // E, e
        /[\u00CC-\u00CF]/g, /[\u00EC-\u00EF]/g, // I, i
        /[\u00D2-\u00D8]/g, /[\u00F2-\u00F8]/g, // O, o
        /[\u00D9-\u00DC]/g, /[\u00F9-\u00FC]/g, // U, u
        /[\u00D1]/g, /[\u00F1]/g, // N, n
        /[\u00C7]/g, /[\u00E7]/g, // C, c
      ]
      , noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

    for (var i = 0; i < accents.length; i++)
      str = str.replace(accents[i], noaccent[i]);

    return str;
  },

  // date utils

  time = (t: number | Function = 0) => {

    const // 
      cb: Function = typeof t === 'number' ? (o: any) => o : t,
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