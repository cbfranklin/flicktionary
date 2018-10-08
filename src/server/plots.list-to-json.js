const readline = require('readline');
const fs = require('fs');

const readliner = readline.createInterface({
  input: fs.createReadStream('./plot.list'),
  crlfDelay: Infinity
});

var obj = {
  plotlines: []
};

var plots = [];

readliner.on('line', (line) => {
  // title
  if(line.includes('MV:')){
    // exclude episodes
    if(line.includes('{')){
        return false;
    }
    else if(line.includes('#')){
        return false;
    }
    else{
      obj.plot = obj.plotlines.join(' ').replace(/  /g,' ');
      console.log('plot: ',obj.plot);
      delete obj.plotlines;
      plots.push(obj);
      obj = {
        plotlines: []
      };
      console.log('line: ',line);
      obj.title = line.replace(/ \(\d\d\d\d\)/g,'').replace(/MV: |"/g,'');
      if(line.match(/\(\d\d\d\d\)/)){
        obj.year = line.match(/\(\d\d\d\d\)/)[0].replace(/\(|\)/g,'');
        if(parseFloat(obj.year) > 1999){
          return false
        }
      }
      console.log('title',obj.title);
      console.log('year',obj.year);
    }
  }
  // plotline
  else if(line.includes('PL:')){
    if(obj.plotlines > 10){
      delete obj.title
      return false;
    }
    if(obj.title){
      obj.plotlines.push(line.replace(/PL: /,''))
    }
    else{
      return false;
    }
  }
});


const callback = () => {
  console.log('saved')
}

const save = () => {
  fs.writeFile('plots.json', JSON.stringify(plots), 'utf8', callback);
}

save();
setInterval(save,10000);
