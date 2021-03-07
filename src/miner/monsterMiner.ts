// @ts-nocheck
var Nightmare = require('nightmare');
const nightmareDebugConfig = { show: true, openDevTools: true, executionTimeout: 90000000 }
const nightmareConf = {}
let nightmare = Nightmare(nightmareConf)

const fs = require('fs');
var path = require('path');

const WIKI_URL = 'https://monster-sanctuary.fandom.com/wiki/';

const MONSTER_PREFIX = 'Monsters';
const SKILLINFO_PREFIX = 'Category:Skills';



function scrapMonsters(){
  const monsters: Object[] = [];
  const currentRows = document.querySelectorAll('.monstertable tbody tr');
  currentRows.forEach(row => {
    const monster = new Object();
    const tds = row.children
    for (let i = 0; i < tds.length; i++) {
      const td = tds[i];
      if (i == 0) {
        monster.id = parseInt(td.textContent);

      } else if (i == 1) {
        //image
        monster.icon = td.firstChild.dataset.src;
      } else if (i == 2) {
        monster.name = td.textcontent
        monster.link = td.firstChild.href

      } else {
        break;
      }
    }
    monsters.push(monster);
  });
  return monsters;
}



function getMonsters() {
  try {
    nightmare
      .goto(WIKI_URL + MONSTER_PREFIX)
      .wait('.mw-customtoggle-monsters')
      .click('.mw-customtoggle-monsters')
      .wait('.monstertable')
      .evaluate(scrapMonsters)
      .end()
      .then((monsters: any[]) => {
        const size = 1 //monsters.length;
        for (let i = 0; i < size; i++) {
          nightmare = Nightmare()
          const monster = monsters[i];
        }
        writeJson('monster.json', JSON.stringify(monsters));
      })
  } catch (e) {
    console.error(e);
  }
}

function getMonsterIcons(monster){
  let nightmare = Nightmare( nightmareConf );
  nightmare
    .goto(monster.link)
    .wait('.monsterbox img')
    .evaluate(() => {
      var images = document.querySelectorAll('.blueborder img');
      return images[0].dataset.src
    })
    .end()
    .then((data) => {
      writeJson('skilltrees.json', JSON.stringify())
    })
}


function writeJson(fileName: string, data: string) {
  fs.writeFileSync(path.join(__dirname, '../../data', fileName), data);
}

getMonsters();