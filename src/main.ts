/*
 * Copyright 2025 agwlvssainokuni
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Command} from 'commander'
import * as vm from 'node:vm'
import * as fs from 'node:fs'
import * as path from 'node:path'

export const main = () => {
    const command = new Command()
    command
        .option('-a, --apple <number>', 'Number of apples')
        .option('-b, --banana <number>', 'Number of bananas')
        .option('-c, --cherry <number>', 'Number of cherries')
        .argument('[files...]', 'Files to process')
        .parse(process.argv)

    const options = command.opts()
    if (options.apple) {
        console.log('apple = ' + options.apple)
    }
    if (options.banana) {
        console.log('banana = ' + options.banana)
    }
    if (options.cherry) {
        console.log('cherry = ' + options.cherry)
    }

    const other: string[] = []

    const context = vm.createContext({
        apple: options.apple,
        banana: options.banana,
        cherry: options.cherry,
        newApple: () => {
            other.push('apple')
        },
        newBanana: () => {
            other.push('banana')
        },
        newCherry: () => {
            other.push('cherry')
        },
    })

    for (const file of command.args) {
        const script = fs.readFileSync(path.resolve(file), {encoding: 'utf-8'})
        vm.runInContext(script, context, {
            filename: path.resolve(file),
        })
    }

    console.log(other)
}
