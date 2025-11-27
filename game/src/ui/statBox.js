import k from "../kaplayCtx";

export default function makeStatBox(){
    const statBox = k.add([
        k.rect(350,500, {radius:4}),
        k.color(0,0,0),
        k.outline(5, new k.Color(230,230,230)),
        k.pos(100,-620),
        {
            activate(){
                k.tween(this.pos.y, 
                    150, .5, 
                    (newPos)=> (this.pos.y = newPos),
                    k.easings.linear
                )
            },
            deactivate(){
                k.tween(this.pos.y, 
                    -600, .5, 
                    (newPos)=> (this.pos.y = newPos),
                    k.easings.linear
                )
            }
        }
    ])
    const player = k.get('player')[0]
    const nameCard = statBox.add([
        k.rect(350,60),
        k.color(0,0,0),
        k.outline(5, new k.Color(230,230,230)),
    ])
    nameCard.add([
        k.text(player.name),
        k.anchor("center"),
        k.pos(nameCard.width/2, 30)
    ])
    let prevPosY = 80;
    for(const key in player.stats){
        if(key === "maxHealth" || key === "isInBattle" || key ==='inventory') continue;
        const statText = statBox.add([
            k.text(`${key}:${player.stats[key]}`),
            k.color(230,230,230),
            k.pos(10,prevPosY),
            {
                async updateOnChange(){
                    let oldStat = player.stats[key];
                    let initialPos= this.pos.y 
                    await this.onUpdate(async ()=>{
                        if(key === 'illness'){
                            const value = player.stats[key].type? player.stats[key].type: 'Healthy'
                            this.text = `${key}: ${value}`;
                        }else{
                            this.text = `${key}:${player.stats[key]}`;
                        }
                        
                        if(oldStat != player.stats[key]){
                            console.log(this)
                            this.color ={r:255,g:0,b:0};
                            this.textSize= 50;
                            setTimeout(() => {
                                this.color= {r:230, g:230, b:230};
                                this.textSize=36;
                            }, 300);
                            await k.tween(
                                initialPos,
                                this.pos.y + 20,
                                0.02,
                                (val) => (this.pos.y = val),
                                k.easings.linear
                            );
                            await k.tween(
                                this.pos.y,
                                initialPos,
                                0.02,
                                (val) => (this.pos.y = val),
                                k.easings.linear
                            );
                        }
                        oldStat = player.stats[key]
                    })
                }
            }
        ])
        statText.updateOnChange();
        prevPosY +=50;
    }
    return statBox;
} 
