class Trie {
    root: any
    constructor() {
        this.root = {}
    }

    insert(word: string) {
        word = word.toLowerCase()
        let node = this.root
        for(let letter of word) {
            if(!node[letter]) {
                node[letter] = {}
            }
            if(node !== this.root && (!node.words)) {
                node.words = []
            }
            if(node.words) {
                node.words.push(word)
            }
            node = node[letter]
        }
        node.isEnd = true
    }

    contains(word: string, i: number = 0, node=this.root): boolean {
        if(!node[word[i]]) return false
        if(i === word.length - 1) return node[word[i]].isEnd
        return this.contains(word, i + 1, node=node[word[i]])
    }

    autocomplete(prefix: string, i: number = 0, node=this.root): string[] {
        prefix = prefix.toLowerCase()
        if(!node[prefix[i]]) return []
        if(i === prefix.length - 1) return node[prefix[i]].words
        return this.autocomplete(prefix, i+1, node[prefix[i]])
    }

}

export default Trie