import Monster from '../model/monster';
import SkillInfo from '../model/skilltree/skillInfo';
var skills = require('../data/skillsRef.json');
var monsters = require('../data/skilltrees.json');

class DataService{

  constructor(monsters, skills){
    this.monsters = [];
    monsters.forEach(data => {
      const monster = new Monster();
      monster.fillData(data);
      this.monsters.push(monster);
    });

    this.skillInfos = [];
    skills.forEach(data => {
      const skillInfo = new SkillInfo();
      skillInfo.fillData(data);
      this.skillInfos.push(skillInfo);
    });
  }

  findMonster(id){
    const result = this.monsters.filter(monster => monster.id == id);
    if (result.length >= 0) {
      const m = new Monster()
      m.fillData(result[0]);
      return m;
    }
    return ;
  }

  findSkill(id){
    const result = this.skillInfos.filter(info => info.id == id);
    if (result.length >= 0) {
      const s = new SkillInfo()
      s.fillData(result[0]);
      return s;
    }
    return ;
  }

}
const service = new DataService(monsters, skills);
export default service;
