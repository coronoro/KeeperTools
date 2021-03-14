<template>
  <div class="monster">
    <div 
      v-if="monsterData.id >= 0"
      class="monster-wrapper">
      <div class="monster-head">
        <div 
          class="button remove-button"
          @click="remove">
            <i class="fas fa-eraser"></i>
        </div>
        <span class="monster-name">
          {{ monsterData.name }}
        </span>
        <div 
          class="button edit-button"
          @click="monsterModal = true">
          <i class="fas fa-pen"></i>
        </div>
      </div>
      <div class="monster-icon">
        <img :src="monsterData.icon">
      </div>
    </div>
    <div 
      v-else
      class="add-wrapper">
      <div 
        class="fa-stack fa-2x add-button"
        @click="monsterModal = true">
        <i class="fas fa-egg fa-stack-2x"></i>
        <i class="fas fa-plus fa-stack-1x"></i>
      </div>
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
import Monster from '../model/monster';


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

    remove(){
      this.monsterData.fillData(new Monster())
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

.monster {
  height: 100%;
}

.add-wrapper{
  height: 100%;
}

.add-button{
  width: 100%;
  vertical-align: middle;
  height: 100%;
  opacity: 0.6;
}

.add-button:hover{
  opacity: 1;
}

.add-button:hover .fa-plus{
  color: #334454;
}

.monster-wrapper {
  display: flex;
  flex-direction: column;
  font-family: 'VT323', monospace;
}

.monster-head{
  width: 100%;
  text-align: center;
}

.monster-head .edit-button {
  float: right;
}

.monster-head .remove-button{
  float: left;;
}

.monster-wrapper .monster-icon{
  margin: 5px;
  display: flex;
  height: 125px;
}

.monster-wrapper .monster-icon img{
  margin: auto;
  object-fit: contain;
  height: 100%;
}

</style>
