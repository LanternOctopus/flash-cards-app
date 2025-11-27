import k from "../kaplayCtx";

export default function makeActionMenu(){
    const actionMenu = k.add(
        [
            k.rect(300,300, {radius:4}),
            k.color(0,0,0),
            k.outline(5, new k.Color(230,230,230)),
            k.pos(100,690),
            k.opacity(0),
            k.state("disabled", ["attack","items","flee","disabled"]),
            {
                options:[],
                isActive:false,
                activate(){
                    this.isActive= true;
                    k.tween(this.opacity, 1,.2, (newOpacity)=>{
                        this.opacity = newOpacity;
                        this.options[0].opacity = newOpacity;
                        this.options[1].opacity = newOpacity;
                        this.options[2].opacity = newOpacity;
                        this.cursor.opacity = newOpacity;
                    }, k.easings.linear)
                },
                deactivate(){
                    this.isActive= false;
                    k.tween(this.opacity, 0,.2, (newOpacity)=>{
                        this.opacity = newOpacity;
                        this.options[0].opacity = newOpacity;
                        this.options[1].opacity = newOpacity;
                        this.options[2].opacity = newOpacity;
                        this.cursor.opacity = newOpacity;
                    }, k.easings.linear)
                },
                enableControls(){
                    if(this.state === "disabled") this.enterState('attack')
                },
                disableControls(){
                    if(this.state !== "disabled") this.enterState('disabled')
                },
                setControls(){
                    this.onStateEnter("attack",()=>{
                        this.cursor.moveTo(10, 40);
                    })
                    this.onStateUpdate("attack", ()=>{
                        if(k.isButtonPressed("down")) this.enterState("items")
                    })
                    this.onStateEnter("items", ()=>{
                        this.cursor.moveTo(10, 80);

                    })
                    this.onStateUpdate("items", ()=>{
                        if(k.isButtonPressed("up")){
                            this.enterState("attack");
                            return;
                        }
                        if(k.isButtonPressed("down")){
                            this.enterState("flee");
                            return;
                        }
                    })
                    this.onStateEnter("flee",()=>{
                        this.cursor.moveTo(10, 120);

                    })
                    this.onStateUpdate("flee",()=>{
                        if(k.isButtonPressed("up")) this.enterState("items")
                    })
                },
            }
        ]
    )
    actionMenu.cursor= actionMenu.add([
        k.text(">"),
        k.color(230,230,230),
        k.pos(10,40),
        k.opacity(0)
    ])
    actionMenu.options.push(
        actionMenu.add([
            k.text("Attack"),
            k.color(230,230,230),
            k.pos(50,40),
            k.opacity(0),
            {name:"attack"}
        ])
    )
        actionMenu.options.push(
        actionMenu.add([
            k.text("Items"),
            k.color(230,230,230),
            k.pos(50,80),
            k.opacity(0),
            {name:"items"}
        ])
    )
        actionMenu.options.push(
        actionMenu.add([
            k.text("Flee"),
            k.color(230,230,230),
            k.pos(50,120),
            k.opacity(0),
            {name:"flee"}
        ])
    )
    return actionMenu;
}