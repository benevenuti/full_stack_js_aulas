class Cliente {

    constructor(nome, sobrenome) {
        this._nome = nome
        this._sobrenome = sobrenome
    }

    ola() {
        return `Olá ${this._nome} ${this._sobrenome}, tudo bem?`
    }

}

export default Cliente