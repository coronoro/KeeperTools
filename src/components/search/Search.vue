<template>
  <div class="search">
    <input 
      v-model="searchString"
      placeholder="monster name"
      class="search-input"
      v-on:keyup.enter="search">
    <div class="search-list">
      <div 
        class="list-item"
        v-for="item in visibleData"
        :key="item.id"
        @click="selectMonster(item)">
        <img :src="item.icon">
        <span class="monster-name">
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../../services/DataService';

export default {
  name: "Search",
  data() {
    return {
      data: [],
      visibleData: [],
      searchString: ''
    };
  },
  methods: {
    selectMonster(item){
      this.$emit('monsterPicked', item)
    },
    search(){
      const searchTerm = this.searchString.toLowerCase();
      if (searchTerm.length > 0) {
        this.visibleData = [...this.data.filter(monster => monster.name.toLowerCase().indexOf(searchTerm) > 0)];
      } else {
        this.visibleData = [...this.data]
      }
    }
  },
  mounted() {
    this.data = [...service.monsters]
    this.visibleData = [...this.data]
  }
};
</script>

<style>
.search{
  height: 100%;
  font-family: 'VT323', monospace;
}

.search-list{
  overflow-x: visible;
  overflow-y: auto;
  height: 100%;
}

.list-item{
  cursor: pointer;
  margin: 2px;
  padding: 5px;
  color: black;
}

.list-item:hover{
  background: #5e6f80;
}
</style>
