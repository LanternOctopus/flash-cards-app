function makePlayerStatsManager(){
    const stats = {
        health: 10,
        maxHealth: 10,
        attack: 5,
        defense: 2,
        lvl:1,
        exp:0,
        illness:{
            type:null,
            recurringDamage:0,
        },
        isInBattle: false,
        inventory: [],
    }
    return{
        current(){
            return{...stats};
        },setIllness(type,recurringDamage){
            stats.illness.type = type;
            stats.illness.recurringDamage = recurringDamage;
        },
        set(key,value){
            if(key in stats){
                stats[key] = value;
                return;
            }
            throw new Error("Can only modify existing state props")
        }
    }
}
const playerStatsManager = makePlayerStatsManager()
export default playerStatsManager;