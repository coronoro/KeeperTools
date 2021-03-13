<template>
  <div class="skilltrees">
    <div 
      v-for="(tree, idx) in skillTrees"
      :key="idx"
      class="tree">
      <div 
        v-for="skillNodes in treeSkills(tree)"
        :key="skillNodes.id"
        class="tree-row">
        <div
          v-for="node in skillNodes"
          :key="node.id"
          class="tree-node-wrapper">
          <skill-tree-node :skillTreeNode="node"></skill-tree-node>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../services/DataService';
import SkillTreeNode from './SkillTreeNode.vue';


export default {
  name: "SkillTreeView",
  components: { SkillTreeNode},
  props: ['skillTrees'],
  data() {
    return {
      data: undefined,
      monsterModal: false
    };
  },
  methods: {
    treeSkills(tree){

      const result = [];
      const maxSkillTreeLevel = 4
      for (let i = 0; i < maxSkillTreeLevel; i++) {
        result[i] = tree.getNodesByLevel(i)
      }
      return result;
    },

    skillIcon(node){
      const skillInfo = service.findSkill(node.skillInfoId);
      return skillInfo.icon
    },

    skillName(node){
      const skillInfo = service.findSkill(node.skillInfoId);
      return skillInfo.name
    }
  },
  mounted() {
    // TODO
  }
};
</script>

<style>
.skilltrees {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.tree {
  display: flex;
  flex-direction: column;
  margin: 5px;
}

.tree-row{
  display: flex;
  justify-content: center;
  padding: 2px;
}
</style>
