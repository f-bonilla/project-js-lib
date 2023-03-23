import Tag  from './html-tags.js';

const openFile = async path=>{
  const response = await fetch(path);
  const data = await response.text();
  return data;
}
const FileManager = (()=>{
  return {
    getHtml: async path=>{
      return Tag.fromString(await openFile(path));
    },
    getJsonFiles: async files=>{
      return Promise.all(files.map(async file=>JSON.parse(await openFile(file))));
    }
  };
})();

export default FileManager;
