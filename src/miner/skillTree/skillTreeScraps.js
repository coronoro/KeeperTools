// @ts-nocheck
module.exports = function scrapSkillTrees() {
  const skillTrees = [];
  const skillNameRegex = /(.*?)\((.*)\)/;
  const skillAltNameRegex = /Icon(.*)(.png)/;

  var columns = document.querySelectorAll('.skilltreetable > tbody > tr');
  const skillsColumn = columns[0];
  const extrasColumn = columns[1];

  var columns = skillsColumn.children;
  // we dont need the first column
  for (let i = 1; i < columns.length; i++) {
    var skillTree = new Object();
    skillTree.skills = [];
    var column = columns[i];
    var skillRows = column.querySelectorAll('.skilltreesingle .skilltreerow tbody > tr, .skilltreesingle topskillgroup tbody > tr');
    let parents = [];
    for (let j = 0; j < skillRows.length; j++) {
      const skillRowCell = skillRows[j];
      skillTree.skills[j] = []
      const skillCells = skillRowCell.querySelectorAll('.skillcell');
      if (skillCells.length > 0) {
        const current = [];
        for (let k = 0; k < skillCells.length; k++) {
          const skillCell = skillCells[k];
          const anchor = skillCell.firstChild.firstChild;

          let skillName = ''
          let matches
          if (anchor.title.length > 0 ) {
            matches = skillNameRegex.exec(anchor.title);
            skillName = matches[1].trim();
          }else {
            matches = skillAltNameRegex.exec(anchor.alt)
            skillName = matches[1].trim();
          }

          const skillInfo = new Object();
          skillInfo.name = skillName; 
          // skillNode
          const skillNode = new Object();
          skillNode.skillInfo = skillInfo
          
          skillTree.skills[j].push(skillNode)
          current.push(skillNode)
        }
        current.forEach(element => {
          element.parents = parents.slice()
        });
        
        if (parents.length == 0) {
        skillTree.roots = current;
        }
        /*
        parents.forEach(parent => {
          parent.children = [...current]
        });
        */
        parents = [];
        current.forEach(element => {
          if (!element.skillInfo.passive) {
            parents.push(element);
          }
        });
      }
    }
    skillTrees.push(skillTree);
  }
  return JSON.stringify(skillTrees);
};
