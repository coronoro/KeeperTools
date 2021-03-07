var Nightmare = require('nightmare');
const nightmareDebugConfig = { show: true, openDevTools: true, executionTimeout: 90000000 };
const nightmareConf = {};
let nightmare = Nightmare( nightmareConf );

const fs = require('fs');
var path = require('path');


const skillsData = path.join(__dirname, '../../data/skills.json')
let rawdata = fs.readFileSync(skillsData);
let skills = JSON.parse(rawdata);

const refinedSkills = [];

run();

function run() {
  let promise;
  for (const skill of skills) {
    if (!promise) {
      promise = getSkillIcon(skill);
    }else{
      promise = promise.then(() => {
        return getSkillIcon(skill)
      })
    }
  }
  promise.then((data) => {
    nightmare.end()
    writeJson('skillsRef.json', JSON.stringify(refinedSkills))
    return 
  })
}

function writeJson(fileName, data) {
  fs.writeFileSync(path.join(__dirname, '../../data', fileName), data);
}



function getSkillIcon(skill){
  return new Promise((resolve, reject) => {
    try {
    nightmare
      .goto(skill.link)
      .wait('.table-wrapper .blueborder img')
      .evaluate(() => {
        debugger
        var images = document.querySelectorAll('.table-wrapper .blueborder img');
        return images[0].currentSrc
      })
      .then(data => {
        console.log(`got url ${data} for skill #${skill.id}`);
        skill.icon = data;
        refinedSkills.push(skill);
        resolve();
        
      });
    } catch (e) {
      reject();
      console.error(e);
    }
  });
}



function writeJson(fileName, data) {
  fs.writeFileSync(path.join(__dirname, '../../data', fileName), data);
}
