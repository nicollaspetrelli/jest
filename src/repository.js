class Repository {
    /**
     * Repositório
     *
     * @type {Object[]}
     */
    #DATABASE = {};

    /**
     * Usado para controlar o ID
     *
     * @type {number}
     */
    #LAST_KEY = 0;

    /**
     * Retorna todos os registros do repositório
     *
     * @returns {Object[]}
     */
    findAll() {
        return this.#DATABASE;
    }

    /**
     * Retorna um registro
     *
     * @param {int} id
     * @returns {null|object}
     */
    findById(id) {
        return (typeof this.#DATABASE[id] === 'undefined')
            ? null
            : this.#DATABASE[id];
    }

    /**
     * Retorna o ID do registro encontrado a partir do filtro especificado ou null se nada for encontrado
     *
     * @param {function(int, object):boolean} callable
     * @returns {int}
     */
    filter(callable) {
        return parseInt(Object.keys(this.#DATABASE).find(id => callable(id, this.#DATABASE[id])));
    }

    /**
     * Salva o objeto no repositório e retorna-o atualizado com o ID
     *
     * @param {object} object
     * @returns {object}
     */
    save(object) {
        this.#LAST_KEY++;
        object.id = this.#LAST_KEY;
        this.#DATABASE[this.#LAST_KEY] = object;

        return object;
    }

    /**
     * Removes the object with the specified iD
     *
     * @param {int} id
     * @returns {boolean}
     */
    deleteById(id) {
        id = parseInt(id);
        if (id < 1) {
            return false;
        }

        if (typeof this.#DATABASE[id] === 'undefined') {
            return false;
        }
        delete this.#DATABASE[id];
        // if (id === this.#LAST_KEY) {
        //     this.#LAST_KEY--;
        // }
        return true;
    }

}

module.exports = Repository;
