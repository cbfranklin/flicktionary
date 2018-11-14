const readline = require("readline");
const fs = require("fs");

const readliner = readline.createInterface({
  input: fs.createReadStream("../../node_modules/plots/plot.list"),
  crlfDelay: Infinity
});

var obj = {
  plotlines: []
};

var plots = [];

readliner.on("line", line => {
  // console.log(line);
  // title
  if (line.includes("MV:")) {
    processTitle(line);
  }
  // plotline
  else if (line.includes("PL:")) {
    processPlot(line)
  }
});

const wordCount = (string) => {
  return string.replace(/^\s+|\s+$/g,"").split(/\s+/).length;
}

const processTitle = (line) => {

  // exclude episodes

  if (line.includes("{")) {
    delete obj.title;
  } else if (line.includes("#")) {
    delete obj.title;
  } else if (line.includes("(VG)") || line.includes("(TV)")) {
    delete obj.title;
  } else {
    obj.plot = obj.plotlines.join(" ").replace(/  /g, " ");
    delete obj.plotlines;
    if(obj.title && obj.plot && obj.year){
      plots.push(obj);
          console.log(obj,wordCount(obj.plot))
    }

    obj = {
      plotlines: []
    };
    obj.title = line.replace(/ \(\d\d\d\d\)/g, "").replace(/MV: |"/g, "");
    if (line.match(/\(\d\d\d\d\)/)) {
      obj.year = line.match(/\(\d\d\d\d\)/)[0].replace(/\(|\)/g, "");
      if (parseFloat(obj.year) > 1999) {
        delete obj.title;
      }
    }
  }
};


const processPlot = (line) => {
  if (obj.plotlines.length > 4) {
    delete obj.title;
    return false;
  }
  if(line.includes('series') || line.includes('�') || line.includes('weekly') || line.includes('show')){
    delete obj.title;
    return false;
  }
  if (obj.title) {
    obj.plotlines.push(line.replace(/PL: /, ""));
  } else {
    delete obj.title;
    return false;
  }
}

const callback = () => {
  console.log("saved");
};

const save = () => {
  fs.writeFile("plots.json", JSON.stringify(plots), "utf8", callback);
};

save();
setInterval(save, 10000);
