var Nightmare = require('nightmare');
const nightmareDebugConfig = { show: true, openDevTools: true, executionTimeout: 90000000 }
const nightmareConf = {show:true, openDevTools: true, executionTimeout: 90000000}
let nightmare = Nightmare( nightmareConf )

const fs = require('fs');
var path = require('path');

const WIKI_URL = 'https://monster-sanctuary.fandom.com/wiki/';

const SKILLINFO_PREFIX = 'Category:Skills';

const skillList = [];

function scrapSkills(){
  const skillNameRegex = /(.*?)\((.*)\)/;
  const skillList = [];

  var skills = document.querySelectorAll('.category-page__member .category-page__member-link');
  // we dont need the first column
  let id = -1;
  debugger
  for (let i = 0; i < skills.length; i++) {
    const skillAnchor = skills[i];

    var skill = new Object();
    skill.id = id;

    const matches = skillNameRegex.exec(skillAnchor.title)
    if (matches) {
      skill.name = matches[1]
      skill.passive = matches[2] == 'Skill' ? false : true;

      skill.link = skillAnchor.href;
      
      skillList.push(skill);
    }
  }
  return skillList;
}

function loadSkills() {
  try {
    nightmare
      .goto(WIKI_URL + SKILLINFO_PREFIX)
      .wait('.category-page__member')
      .evaluate(scrapSkills)
      .then(skills => {
        skillList.push(...skills);
        try {
          return loadSkillsRec().then(()=> {
            nightmare.end

            const result = [];
            let length = skillList.length;
            for (let i = 0; i < length; i++) {
              const skill = skillList[i];
              skill.id = i;
              skill.name = skill.name.trim();
              result.push(skill);
            }
            writeJson('skills.json', JSON.stringify(result))
          })
        } catch (error) {
          console.log(error)
        }
      })
  } catch (e) {
    console.error(e);
  }
}


function loadSkillsRec() {
  return new Promise((resolve, reject) => { 
    nightmare
      .exists('.category-page__pagination-next')
      .then((exists) => {
        if (exists) {
          nightmare
            .click('.category-page__pagination-next')
            .wait('.category-page__member')
            .evaluate(scrapSkills)
            .then(skills => {
              skillList.push(...skills);
              return loadSkillsRec().then(() => resolve())
            })
        } else {
          resolve();
        }
      })
      .catch((error) => {
        console.log(error);
        nightmare.end();
      });
  });
}



function writeJson(fileName, data) {
  fs.writeFileSync(path.join(__dirname, '../../data', fileName), data);
}

loadSkills();