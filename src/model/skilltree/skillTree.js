const SkillTreeNode = require("./skillTreeNode");

module.exports = class SkillTree {

  constructor(){
    this.skills = []
  }

  fillData(treeData){
    treeData.skills.forEach(skillData => {
      const node = new SkillTreeNode();
      node.fillData(skillData);
      this.skills.push(node);
    });
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