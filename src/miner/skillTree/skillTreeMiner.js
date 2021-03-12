
const SkillTree = require("../../model/skilltree/skillTree")
const SkillTreeNode = require("../../model/skilltree/skillTreeNode")
const scrapSkillTrees = require("./skillTreeScraps")


var Nightmare = require('nightmare');
const nightmareDebugConfig = { show: true, openDevTools: true, executionTimeout: 90000000 };
const nightmareConf = { executionTimeout: 90000000 };
let nightmare = Nightmare( nightmareConf );

const fs = require('fs');
var path = require('path');


const skillsData = path.join(__dirname, '../../../data/skillsRef.json')
let rawdata = fs.readFileSync(skillsData);
let skills = JSON.parse(rawdata);

const skillNameMap = new Map();
skills.forEach(skill => {
  skillNameMap.set(skill.name.toLowerCase(), skill);
});


const monsterData = path.join(__dirname, '../../../data/monster.json')
rawdata = fs.readFileSync(monsterData);
let monsters = JSON.parse(rawdata);

run();

function run() {
  let promise;
  for (const monster of monsters) {
    if (!promise) {
      promise = getSKillTree(monster);
    }else{
      promise = promise.then(() => {
        return getSKillTree(monster)
      })
    }
  }
  if (promise) {
    promise.then((data) => {
      nightmare.end();
      writeJson('skilltrees.json', JSON.stringify(monsters))
      process.exit();
    })
  }
}

function getSKillTree(monster){
  return new Promise((resolve, reject) => {
     nightmare
      .goto(monster.link)
      .wait('.skilltreetable img')
      .evaluate(scrapSkillTrees)
      .then((data) => {

        console.log(`parsed tree for monster ${monster.id}`)
        const parsed = JSON.parse(data)

        const trees = []

        parsed.forEach(parsedTree => {
          const tree = new SkillTree();
          let nodeId = 0;
          for (let i = 0; i < parsedTree.skills.length; i++) {
            const skillTreeRow = parsedTree.skills[i];
            skillTreeRow.forEach((skillTreeNode) => {
              let currentParsedInfo = skillTreeNode.skillInfo;
              const node = new SkillTreeNode();
              node.id = nodeId
              nodeId ++;
              const skillInfo = skillNameMap.get(currentParsedInfo.name.toLowerCase());
              if (skillInfo) {
                node.skillInfoId = skillInfo.id;
              }else{
                console.log(`could not find skill with name ${currentParsedInfo.name}`);
              }
              node.level = i;
              node.parents = [];
              skillTreeNode.parents.forEach((parent) => {
                const parentSKillInfo = skillNameMap.get(parent.skillInfo.name.toLowerCase());
                // passives dont get new skills
                if (parentSKillInfo) {
                  if ( !parentSKillInfo.passive) {
                    // passive depends on ancestor active skill
                    if (skillInfo.passive) {
                      node.parents.push(parentSKillInfo.id);
                    }else{
                      //upgraded version of a skill
                      if (isUpgrade(skillInfo, parentSKillInfo)) {
                        node.parents.push(parentSKillInfo.id);
                      }else if (isNewSkill(skillInfo, skillTreeNode.parents)) {
                        node.parents.push(parentSKillInfo.id);
                      }
                    }
                  }
                }else{
                  console.log(`could not find parent skill with name ${skillTreeNode.skillInfo.name}`);
                }
              });
              tree.skills.push(node);
            });
            
          }
          trees.push(tree);
        });
        monster.skillTrees = trees;
        resolve(monster)
      });
  });
}


function writeJson(fileName, data) {
  fs.writeFileSync(path.join(__dirname, '../../../data', fileName), data);
}

function isNewSkill(skillInfo, parents) {
  let result = true;
  parents.forEach((parent) => {
    if (parent.skillInfo.name.toLowerCase() === skillInfo.name.toLowerCase()) {
      result = false;
    }
  });
  return result
}
function isUpgrade(currentParsedInfo, parentSKillInfo) {
  return parentSKillInfo.name.toLowerCase() === currentParsedInfo.name.toLowerCase()
}

