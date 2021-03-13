
module.exports = class SkillTreeNode {

  constructor(){
    this.id = -1
    this.level = -1
    this.parents = []
    this.skillInfoId = -1
  }

  fillData(nodeData){
    this.id = nodeData.id
    this.level = nodeData.level
    this.parents = nodeData.parents
    this.skillInfoId = nodeData.skillInfoId
  }
}