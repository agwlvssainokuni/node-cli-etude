import {apple, banana, cherry, newApple, newBanana, newCherry} from "./dsl";

if (apple) {
    for (let i = 0; i < apple; i++) {
        newApple()
    }
}
if (banana) {
    for (let i = 0; i < banana; i++) {
        newBanana()
    }
}
if (cherry) {
    for (let i = 0; i < cherry; i++) {
        newCherry()
    }
}
