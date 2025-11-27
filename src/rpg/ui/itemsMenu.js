export default function makeItemsMenu(k,inventory){
    const slotStates = []

    for( let i = 0; i < inventory.length; i++ ){
        slotStates.push(`slot-${i}`)
    }
    const itemsMenu = k.add([
        k.rect(400,300, {radius:4}),
        k.color(0,0,0),
        k.outline(5, new k.Color(230,230,230)),
        k.pos(300,420),
        k.opacity(0),
        k.state("disabled",[...slotStates, "disabled"]),
        {
            items:[],
            isActive:false,
            currentItemIndex:0,
            activate(){
                this.isActive= true;
                k.tween(this.opacity, 1,.2, (newOpacity)=>{
                    this.opacity = newOpacity;
                    for(const child of this.items){
                        child.opacity =newOpacity
                    }
                    this.cursor.opacity = newOpacity;
                }, k.easings.linear)
                this.setControls()
                this.enterState("slot-0")
            },
            async deactivate(){
                this.isActive= false;
                await k.tween(this.opacity, 0,.2, (newOpacity)=>{
                    this.opacity = newOpacity;
                    for(const child of this.items){
                        child.opacity =newOpacity
                    }
                    this.cursor.opacity = newOpacity;
                }, k.easings.linear);
                k.destroy(this)
            },
            setControls(){
                const placeCursor = (slotName)=>{
                    const slotItem = k.get(slotName,{recursive: true})[0];
                    this.cursor.moveTo(k.vec2(this.cursor.pos.x, slotItem.pos.y))
                    this.currentItemIndex = slotItem.indexInInventory;
                }
                for(let i = 0; i < slotStates.length; i++){
                    this.onStateEnter(`slot-${i}`, ()=> placeCursor(`slot-${i}`))
                    if(slotStates.length===1) return;
          if (i === 0) {
            this.onStateUpdate("slot-0", () => {
              if (k.isButtonPressed("down")) this.enterState(`slot-${i + 1}`);
            });
            continue;
          }

          if (i === slotStates.length-1) {
            this.onStateUpdate(`slot-${i}`, () => {
              if (k.isButtonPressed("up")) this.enterState(`slot-${i - 1}`);
            });
            continue;
          }
                    this.onStateUpdate(`slot-${i}`, ()=>{
                        if(k.isButtonPressed('up')) this.enterState(`slot-${i-1}`)
                        if( k.isButtonPressed('down')) this.enterState(`slot-${i+1}`)
                    })
                    
                }

            }

        }
    ]);
    itemsMenu.cursor= itemsMenu.add([
        k.text(">"),
        k.color(230,230,230),
        k.pos(10,40),
        k.opacity(0)
    ])
    let offsetY = 40;
    for( let i=0; i<inventory.length; i++){
        itemsMenu.items.push(
            itemsMenu.add([
                k.text(inventory[i].name), 
                k.color(230,230,230),
                    k.pos(50,offsetY),
                    k.opacity(0),
                    `slot-${i}`,
                    {indexInInventory: i}
                            
                ])       
            )
        offsetY +=40;
        if(i>4){
            itemsMenu.height +=40
        }
    }
    return itemsMenu;
}