var Nightmare = require('nightmare');
const nightmareDebugConfig = { show: true, openDevTools: true, executionTimeout: 90000000 };
const nightmareConf = {};
let nightmare = Nightmare( nightmareConf );

const fs = require('fs');
var path = require('path');

const iconRegex = /.*latest\//

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


function scrapIcons(name){
  var images = document.querySelectorAll('.table-wrapper .blueborder img');
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const alt = image.alt.toLowerCase();
    debugger
    if (alt.indexOf(name.toLowerCase()) > 0) {
      return image.currentSrc;
    }   
  }
  return images[1].currentSrc
}


function getSkillIcon(skill){
  return new Promise((resolve, reject) => {
    const name = skill.name;
    try {
    nightmare
      .goto(skill.link)
      .wait('.table-wrapper .blueborder img')
      .evaluate(scrapIcons, name)
      .then(data => {
        const matches = iconRegex.exec(data);
        if (matches) {
          console.log(`got url ${matches[0]} for skill #${skill.id}`);
          skill.icon = matches[0];
          refinedSkills.push(skill);
          resolve();
        }else{
          reject();
        }
        
      });
    } catch (e) {
      reject();
      console.error(e);
    }
  });
}
