import k from "../kaplayCtx"
export function makeEnemy(pos, name, sprite, stats, items, mapSprite=null){
    return k.add([
        k.sprite(mapSprite ? mapSprite : sprite,{width:150, height:150}),
        k.anchor("center"),
        k.area(),
        k.body({isStatic: true}),
        k.pos(pos),
        'enemy',
        {
            name,
            stats,
            items,
            async shake(){
                const enemyInBattlefield = k.get(`enemy-in-battlefield-${name}`,{recursive:true})[0]
                const initialPos= enemyInBattlefield.pos.y;
                await k.tween(
                    initialPos,
                    enemyInBattlefield.pos.y + 20,
                    0.02,
                    (val) => (enemyInBattlefield.pos.y = val),
                    k.easings.linear
                );
                await k.tween(
                    enemyInBattlefield.pos.y,
                    initialPos,
                    0.02,
                    (val) => (enemyInBattlefield.pos.y = val),
                    k.easings.linear
                );
            },
            async dropDown(){
                const enemyInBattlefield = k.get(`enemy-in-battlefield-${name}`,{recursive:true})[0]
                const initialPos= enemyInBattlefield.pos.y;
                await k.tween(
                    initialPos,
                    enemyInBattlefield.pos.y + 520,
                    .5,
                    (val) => (enemyInBattlefield.pos.y = val),
                    k.easings.linear
                );
            }
        }
    ])
}