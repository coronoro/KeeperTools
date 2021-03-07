import { SkillTreeNode } from "./skillTreeNode";

export class SkillTree {

    skills: SkillTreeNode[] = []


    getRootNodes(): SkillTreeNode[] {
      let result: SkillTreeNode[] = [];
      this.skills.forEach((skill: SkillTreeNode) => {
        if (skill && skill.parents.length === 0) {
          result.push(skill);
        }
      });
      return result;
    }

    getNodesByLevel(level: Number): SkillTreeNode[]{
      let result: SkillTreeNode[] = [];
      this.skills.forEach((skill: SkillTreeNode) => {
        if (skill && skill.level === level) {
          result.push(skill);
        }
      });
      return result;
    }

    getChildren(node: SkillTreeNode) : SkillTreeNode[]{
      let result: SkillTreeNode[] = [];
      this.skills.forEach((skill: SkillTreeNode) => {
        if (skill && skill.parents.includes(node.id)) {
          result.push(skill);
        }
      });
      return result;
    }

}