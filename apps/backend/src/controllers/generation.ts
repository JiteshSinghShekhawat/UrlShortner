const lastUri = 62 ** 7 - 2;
const list = "adefOPQlmnopqYZ0rs69tuvwxyzA78BCDIJKLMEFG1HbcNRSTghijkUVWX2345";
const myMap: { [key: string]: number } = {};
for (let i = 0; i < list.length; i++) {
  myMap[list[i]] = i;
}

const generateString = (n: number) => {
  let temp = "";
  while (n > 0) {
    temp = list[n % 62] + temp;
    n = Math.floor(n / 62);
  }
  while (temp.length < 7) {
    temp = list[0] + temp;
  }
  return temp;
};

export const createShortUrl = (n: number) => {
  if (n % 2) {
    return generateString(n);
  } else {
    n = lastUri - n;
    return generateString(n);
  }
};

export const urlToNumber = (uri: string) => {
  let no = 0;
  for (let i = 0; i < uri.length; i++) {
    if (!(uri[i] in myMap)) return -1;
    no *= 62;
    no += myMap[uri[i]];
  }
  if(no%2 == 0){
    no = lastUri - no; 
  }
  return no;
};
