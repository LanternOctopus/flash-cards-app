export default function makeBattleField(k, enemyName, 
    enemySprite, 
    backgroundShader = null
){
    const container = k.add([
        k.rect(1300, 900, {raidus:4}),
        k.color(9, 132, 227),
        k.outline(5, new k.Color(230,230,230)),
        k.anchor("center"),
        k.pos(k.center().x + 200, 1600),
        {
            activate(){
                k.tween(
                    this.pos.y,
                    k.center().y,
                    .5,
                    (newPos) => (this.pos.y = newPos),
                    k.easings.linear
                );
            },
            deactivate(){
                k.tween(
                    this.pos.y,
                    1600,
                    .5,
                    (newPos) => (this.pos.y = newPos),
                    k.easings.linear
                );
            }
        }
    ])
    // todo add shader as child of container
    container.add([
        k.sprite(enemySprite),
        k.anchor("center"),
        k.scale(1),
        k.pos(0,-100),
        `enemy-in-battlefield-${enemyName}`
    ])
    return container;
}