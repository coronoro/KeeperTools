<template>
  <div class="team-border">
    <div class="team">
      <div
        v-for="member in team"
        :key="member.id"
        class="monster-container">
        <monsterView 
          @dataChange="handleChange"
          :monsterData="member"/>
      </div>
    </div>
  </div>
</template>

<script>
import Monster from '../model/monster';
import monsterView from './Monster.vue';
import router from '../router'
import service from '../services/DataService';


export default {
  components: { monsterView },
  name: "team-list",
  data() {
    return {
      teamSize: 6,
      team: [],
    };
  },
  
  methods: {
    handleChange(){
      const monsterIds = [];
      this.team.forEach(member => {
        if (member.id >= 0 ) {
          monsterIds.push(member.id)
        }else{
          monsterIds.push(-1)
        }
      });
      router.push({ path: 'team', query: { mid: monsterIds }})
    }
  },
  
  beforeMount() {
    const mids = this.$route.query.mid;
    console.log(mids)
    for (let i = 0; i < this.teamSize; i++) {
      let monster = new Monster();
      if (mids && mids.length > i && mids[i] >= 0) {
        monster = service.findMonster(mids[i])
      }else{
        monster.id = -1 * (i+1)
      }
      this.team.push(monster);
    }
  }
};
</script>

<style>
.team {
  display: flex;
  flex-wrap: wrap;
  font-family: 'VT323', monospace;
}

.monster-container {
  background: #334454;
  width: 30%;
  height: 200px;
  border-image: url(https://vignette.wikia.nocookie.net/monster-sanctuary/images/2/25/BlueBorder.png) 14 14 stretch;
  border-width: 14px;
  border-style: solid;
  padding: 5px;
  justify-content: space-between;
  margin-right: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  color: #fff;
}
</style>
