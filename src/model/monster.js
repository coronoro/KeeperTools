
module.exports =  class Monster {

  constructor(){
    this.id = -1
    this.shift = ''
    this.name = ''
    this.icon = ''
    this.link = ''
    this.skillTrees = []
  }

  fillData(data){
    this.id = data.id;
    this.name = data.name;
    this.icon = data.icon;
    this.link = data.link;
    this.skillTrees = data.skillTrees;
  }

}