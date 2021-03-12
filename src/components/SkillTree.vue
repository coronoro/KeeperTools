<template>
  <div class="skilltrees">
    <div 
      v-for="tree in skillTrees"
      :key="tree"
      class="tree">
      <div 
        v-for="skillNode in treeSkills(tree)"
        :key="skillNode.id">
        <div class="tree-node">
          {{skillName(skillNode)}}
        </div>
      </div>
    </div>
    <modal
      v-show="monsterModal"
      @close="closeMonsterModal">
      <template v-slot:body>

      </template>
    </modal>
  </div>
</template>

<script>
import modal from './modal/Modal.vue';
import service from '../services/DataService';


export default {
  name: "SkillTreeView",
  components: {modal},
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
}
</style>
