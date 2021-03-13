<template>
  <div
    v-if="skillInfo"
    class="skill-tree-node">
    <img 
      :src="skillInfo.icon" 
      :alt="skillInfo.name"
      class="skill-icon">
  </div>
</template>

<script>
import service from '../services/DataService';


export default {
  name: "SkillTreeNodeView",
  props: ['skillTreeNode'],
  data() {
    return {
      skillInfo: undefined,
    };
  },
  methods: {

  },
  mounted() {
    this.skillInfo = service.findSkill(this.skillTreeNode.skillInfoId)
  }
};
</script>

<style>

.skill-icon{
  width: 25px;
  height: 25px;
}
</style>
