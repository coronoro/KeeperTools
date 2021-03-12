
module.exports = class SkillTree {

  constructor(){

    this.skills = []
  }

  getRootNodes() {
    let result = [];
    this.skills.forEach((skill) => {
      if (skill && skill.parents.length === 0) {
        result.push(skill);
      }
    });
    return result;
  }

  getNodesByLevel (level){
    let result = [];
    this.skills.forEach((skill) => {
      if (skill && skill.level === level) {
        result.push(skill);
      }
    });
    return result;
  }

  getChildren(node) {
    let result = [];
    this.skills.forEach((skill) => {
      if (skill && skill.parents.includes(node.id)) {
        result.push(skill);
      }
    });
    return result;
  }
}