import gameStateManager from "../state/gameStateManager"
import makeTextBox from "../ui/textBox"
import makeActionMenu from "../ui/actionMenu"
import makeItemsMenu from "../ui/itemsMenu"
import { applyAttackEffect, applyIllnessDamageEffect, applyItemBuffEffect, applyItemCureEffect, applyItemDebuffEffect, applyItemHarmEffect, applyItemHealEffect, applyItemIllnessEffect } from "./effects"
import makeStatBox from "../ui/statBox"
import playerStatsManager from "../state/playerStatsManager"
import makeBattleField from "../ui/battleField"
export default function makeBattleSystem(k,player, enemy){
    gameStateManager.set("isInBattle", true)

    const battleState = k.add(
        [
            k.state("battle-start",
                [
                    "battle-start",
                    "enemy-appearance",
                    "player-turn",
                    "attack-action",
                    "items-action",
                    "flee-action",
                    "enemy-turn",
                    "fled",
                    "victory",
                    "defeat"
                ]
            )
        ]
    )
    const battleField = makeBattleField(k, enemy.name, enemy.sprite);
    const textBox = makeTextBox(k);
    const statBox = makeStatBox(k);
    const actionMenu = makeActionMenu(k)
    actionMenu.setControls()
    let itemsMenu = makeItemsMenu(k, gameStateManager.current().inventory)
    battleState.onStateEnter("battle-start",()=>{
        battleField.activate();
        statBox.activate();
        textBox.activate();
        battleState.enterState("enemy-appearance")
    })
    battleState.onStateEnter("enemy-appearance", async ()=>{
        await k.wait(1)
        await textBox.displayLine(`${enemy.name} appears!`)
        battleState.enterState("player-turn")
    })
    battleState.onStateEnter("player-turn", (flags)=>{
        console.log('player turn')
        console.log('player')
        console.log(player.stats)
        console.log('enemy')
        console.log(enemy.stats)

        if(!actionMenu.isActive){
            actionMenu.activate()
            actionMenu.enableControls()
        }
        if(player.stats.illness.type && !flags?.cancelIllnessEffect){
            applyIllnessDamageEffect(textBox, player);
        }
        if (player.stats.health === 0 ){
            battleState.enterState("defeat");
            return;
        } 
    })
    battleState.onStateUpdate("player-turn", async ()=>{

        if (!k.isButtonPressed("confirm")) return;

        if(actionMenu.state === "attack"){
            battleState.enterState("attack-action")
        }
        if(actionMenu.state ==="items" && 
            gameStateManager.current().inventory.length === 0){
            await textBox.displayLine("No items left in inventory!");
            return;

        }
         if(actionMenu.state ==="items" ){
            battleState.enterState("items-action")
            return;
        }
        if(actionMenu.state === "flee"){
            battleState.enterState("flee-action")
            return;
        }
        
        return;

    })
    battleState.onStateEnter("attack-action", async ()=>{
        actionMenu.deactivate();
        await textBox.displayLine(`${player.name} attacks!`)
        await enemy.shake()
        await applyAttackEffect(textBox,player, enemy)
        if(enemy.stats.health <= 0){
            battleState.enterState('victory')
        }
        battleState.enterState("enemy-turn")
    })
    battleState.onStateEnter("items-action",()=>{
        actionMenu.disableControls()
        itemsMenu.activate();
    })
    battleState.onStateUpdate("items-action", async ()=>{
        const inventory = gameStateManager.current().inventory;

        if(k.isButtonPressed("left")){
            itemsMenu.deactivate();
            itemsMenu = makeItemsMenu(k, gameStateManager.current().inventory)
            
            actionMenu.enterState("items"); 
            battleState.enterState("player-turn", {cancelIllnessEffect:true});
            return;
        }
        if(k.isButtonPressed("confirm")){
            const selectItem = inventory.splice(itemsMenu.currentItemIndex,1)[0]
            gameStateManager.set("inventory", [...inventory]);
            itemsMenu.deactivate()
            itemsMenu = makeItemsMenu(k,inventory);
            actionMenu.deactivate()
            await textBox.displayLine(`${player.name} used ${selectItem.name}!`)
            //TODO item effect logic
            if(selectItem.effect === 'harm'){
               await enemy.shake();
               await applyItemHarmEffect(textBox, enemy, selectItem);
            }
            if(selectItem.effect === 'heal'){
                await applyItemHealEffect(textBox, player, selectItem);
            }
            if(selectItem.effect === 'illness'){
                await enemy.shake();
                await applyItemIllnessEffect(textBox, enemy, selectItem);
            }
            if(selectItem.effect === 'cure'){
                await applyItemCureEffect(textBox, player, selectItem);
            }
            if(selectItem.effect === 'buff'){
                await applyItemBuffEffect(textBox, player, selectItem);
            }
            if(selectItem.effect === 'debuff'){
                await applyItemDebuffEffect(textBox, enemy, selectItem);
            }
            await k.wait(1)
            battleState.enterState("enemy-turn")
        }
    })
    battleState.onStateEnter("flee-action", async ()=>{
        await textBox.displayLine(`${player.name} attempted to flee!`);

        const canFlee = enemy.stats.health < player.stats.maxHeath/3 || k.rand(0,1) <.5;
        if(canFlee){
        await textBox.displayLine(`${player.name} successfully fled!`);
        battleState.enterState("fled")
        return;
            
        }
        await textBox.displayLine(`${player.name} failed to flee!`);

        battleState.enterState("enemy-turn")
    })
    battleState.onStateEnter("enemy-turn", async ()=>{
        console.log('enemy turn')
        console.log('player')
        console.log(player.stats)
        console.log('enemy')
        console.log(enemy.stats)

        if(enemy.stats.illness.type){
            await enemy.shake();
            await applyIllnessDamageEffect(textBox, enemy);

        }
        if(enemy.stats.health === 0){
            await textBox.displayLine(`${enemy.name} Fainted!`);
            await enemy.dropDown();
            battleState.enterState("victory");
            return;
        }
        let itemWasUsed = false;
        const removeItemFromInventory = (index)=>{
            enemy.stats.items.splice(index,1);
            itemWasUsed = true;
        };
        if(enemy.stats.items.length > 0){
            for(const[index, selectItem] of Object.entries(enemy.stats.items)){
                if(selectItem.effect === "cure" && 
                    enemy.stats.illness.type === selectItem.type
                ){
                    await textBox.displayLine(`${enemy.name} used ${selectItem.name}!`)
                    await applyItemCureEffect(textBox, enemy, selectItem);
                    break;
                }
                console.log(enemy.stats.health)
                if(selectItem.effect === "heal" &&
                    enemy.stats.health < enemy.stats.maxHealth/3
                ){  
                console.log(enemy.stats.health)

                    await textBox.displayLine(`${enemy.name} used ${selectItem.name}!`)
                    await applyItemHealEffect(textBox, enemy, selectItem);
                    removeItemFromInventory(index)
                    break;
                }
                if(selectItem.effect === "buff" ){  
                    await textBox.displayLine(`${enemy.name} used ${selectItem.name}!`)
                    await applyItemBuffEffect(textBox, enemy, selectItem);
                    removeItemFromInventory(index)
                    break;
                }
                if(selectItem.effect === "debuff" ){  
                    await textBox.displayLine(`${enemy.name} used ${selectItem.name} on ${player.name}!`)
                    await applyItemDebuffEffect(textBox, player, selectItem);
                    removeItemFromInventory(index)
                    break;
                }
                if(selectItem.effect === "harm" ){  
                    await textBox.displayLine(`${enemy.name} used ${selectItem.name} on ${player.name}!`)
                    await applyItemHarmEffect(textBox, player, selectItem);
                    removeItemFromInventory(index)
                    break;
                }
                if(selectItem.effect ==="illness"){
                    await textBox.displayLine(`${enemy.name} used ${selectItem.name} on ${player.name}!`)
                    await applyItemIllnessEffect(textBox, player, selectItem);
                    removeItemFromInventory(index)
                    break;
                }
            }
        }
        if(!itemWasUsed){
            await textBox.displayLine(`${enemy.name} attacked!`);
            await applyAttackEffect(textBox, enemy, player);
        }
        await k.wait(1)
        battleState.enterState("player-turn")
    })
    const deactivateUI = ()=>{
        battleField.deactivate()
        textBox.deactivate();
        actionMenu.deactivate();
        statBox.deactivate();
    }
    const resetPlayerStats = () => {
        const playerStats = playerStatsManager.current();
        player.stats.attack = playerStats.attack;
        player.stats.defense = playerStats.defense;
    };
    battleState.onStateEnter("victory", async()=>{
        await textBox.displayLine(`${player.name} won!`);
        player.stats.exp += enemy.stats.exp;
        await textBox.displayLine(`${player.name} earned ${enemy.stats.exp}`);
        deactivateUI();
        resetPlayerStats();
        gameStateManager.set("isInBattle", false)
    })
    battleState.onStateEnter("defeat", async()=>{
        await textBox.displayLine(`${player.name} fainted!`);
        await textBox.displayLine(`${player.name} lost the battle!`);

        await k.wait(1)
        k.go("gameover");
    })

    battleState.onStateEnter("fled", ()=>{
        deactivateUI()
        gameStateManager.set('isInBattle', false)
    })

}