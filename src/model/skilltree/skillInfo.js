
module.exports = class SkillInfo {
  constructor(){
    this.id = -1
    this.name = ''
    this.icon = ''
    this.passive = true;
    this.link = ''
  }

  fillData(data){
    this.id = data.id;
    this.name = data.name;
    this.icon = data.icon;
    this.passive = data.passive;
    this.link = data.link;
  }
}