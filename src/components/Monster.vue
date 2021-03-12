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
      <div 
        v-if="monsterData.skillTrees"
        class="monster-skilltree">
        <skilltree :skillTrees="monsterData.skillTrees">
        </skilltree>
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
      monsterModal: false
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

.button{
  display: inline;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background: #b0bec5;
}

.monster-icon{
  margin: 5px;
  display: flex;
}

.monster-icon img{
  margin: auto;
}

</style>
