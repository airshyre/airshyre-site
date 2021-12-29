export function replaceURL(url: string, newUrl: string){
    const [front, end] = url.split(".com");
    return "https://" + newUrl + end;
  }