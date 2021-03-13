<template>
  <div class="monster">
    <div 
      v-if="monsterData.id >= 0"
      class="monster-wrapper">
      <div class="monster-head">
        <span class="monster-name">
          {{ monsterData.name }}
        </span>
        <div 
          class="button"
          @click="monsterModal = true">
          <i class="fas fa-pen"></i>
        </div>
      </div>
      <div class="monster-icon">
        <img :src="monsterData.icon">
      </div>
    </div>
    <div v-else>
      <button @click="monsterModal = true">+</button>
    </div>
    <modal
      v-show="monsterModal"
      @close="closeMonsterModal">
      <template v-slot:body>
        <search @monsterPicked="setMonster">
        </search>
      </template>
    </modal>
    <modal
      v-show="skillModal"
      @close="closeSkillModal">
      <template v-slot:body>
        <skilltree :skillTrees="monsterData.skillTrees">
        </skilltree>
      </template>
    </modal>
  </div>
</template>

<script>
import search from './search/Search.vue';
import modal from './modal/Modal.vue';
import skilltree from './SkillTree.vue'


export default {
  name: "MonsterView",
  components: {modal, search, skilltree},
  props: ['monsterData'],
  data() {
    return {
      monsterModal: false,
      skillModal: false
    };
  },
  methods: {
    setMonster(data){
      this.closeMonsterModal();
      this.monsterData.fillData(data);
      this.$emit('dataChange')
    },

    closeMonsterModal(){
      this.monsterModal = false;
    },

    closeSkillModal(){
      this.skillModal = false;
    }
  },
  mounted() {
    //TODO 
  }
};
</script>

<style>
.monster-wrapper {
  display: flex;
  flex-direction: column;
  font-family: 'VT323', monospace;
}

.monster-head{
  width: 100%;
  text-align: center;
}



.monster-head .button {
  float: right;
}

.monster-icon{
  margin: 5px;
  display: flex;
}

.monster-icon img{
  margin: auto;
}

</style>
