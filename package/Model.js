

module.exports = class Model{

    /**
     * @param {Object} query
     * @param {Object} projection
     */
    static get(query, projection = {}){
        return this.find(query, projection)
    }

    /**
     * @param {Object} query
     * @param {Object} projection
     */
    static getOne(query, projection = {}){
        return this.findOne(query, projection)
    }


    /**
     * @param {Object} query
     * @param {Object} projection
     */
    static getOneOrMany(query, projection = {}){
        return new Promise((resolve, reject)=>{
            this.get(query, projection)
            .then(result =>  result.length == 1 ? resolve(result[0]) : resolve(result), reject)
            .catch(reject)
        })
    }

    /**
     * @param {Object} query
     * @param {Object} projection
     */
    static getOrFail(query, projection = {}){
        return new Promise((resolve, reject)=>{
            this.get(query, projection)
            .then(result => result.length ? resolve(result) : reject(result), reject)
            .catch(reject)
        })
    }

    /**
     * @param {Object} query
     * @param {Object} projection
     */
    static getOneOrFail(query, projection = {}){
        return new Promise((resolve, reject)=>{
            this.getOne(query, projection)
            .then(result => result ? resolve(result) : reject(result), reject)
            .catch(reject)
        })
    }


    /**
     * 
     * @param {Object} query
     * @param {Object} editQuery
     * @param {Object} body 
     * @param {Object} projection 
     */
    static getOneAndEdit(query, editQuery, body, projection = {}){
        return new Promise((resolve, reject)=> {
                    this.update(editQuery,body)
                    .then(() => this.getOne(query, projection), reject)
                    .then(resolve, reject)
                    .catch(reject)
        })            
    }


    /**
     * 
     * @param {Object} query 
     * @param {Object} editQuery 
     * @param {Object} body 
     * @param {Object} projection 
     */
    static getManyAndEdit(query, editQuery, body, projection = {}){
        return new Promise((resolve, reject)=> {
            this.updateMany(editQuery,body)
            .then(() => this.get(query, projection), reject)
            .then(resolve, reject)
            .catch(reject)
        })
    }

    /**
     * @param {Object} query
     * @param {Object} body
     * @param {Object} projection
     */
    static getOrCreate(query, body, projection={}){
        return new Promise((resolve, rejecet)=> {
            this.getOrFail(query, projection)
                .then(resolve, () => this.create(body))
                .then(resolve, reject)
                .catch(reject)
        })
    }

    /**
     * @param {Object} body
     * @param {Object} projection
     */
    static createThenGet(body, projection={}){
        return new Promise((resolve, reject)=>{
                this.create(body)
                .then(model => this.getOne({_id : model._id}), reject)
                .then(resolve, reject)
                .catch(reject)
        })
    }

    /**
     * @param {Object} query
     * @param {Object} body
     */
    static edit(query, body){
        return new Promise((resolve, reject)=>{
            this.update(query, body)
                .then(() => this.getOne(query))
                .then(resolve, reject)
                .catch(reject)
        }) 
    }


    /**
     * @param {Object} query
     * @param {Object} body
     */
    static editMany(query, body){
        return new Promise((resolve, reject)=> {
            this.updateMany(query, body)
            .then(() => this.get(query), reject)
            .then(resolve, reject)
            .catch(reject)
        })
    }


    /**
     * @param {Object} query
     * @param {Object} body
     */
    static editOrFail(query, body){
        return new Promise((resolve, reject)=>{
            this.edit(query, body)
            .then(result => result ? resolve(result) : reject(result), reject)
            .catch(reject)
        })
    }

    
    /**
     * @param {Object} query
     * @param {Object} body
     */
    static editManyOrFail(query, body){
        return new Promise((resolve, reject)=> {
            this.editMany(query, body)
            .then(result => result.length ? resolve(result) : reject(result), reject)
            .catch(reject)
        })
    }


    
    /**
     * @param {Object} query
     */
    static deleteOrFail(query){
        return new Promise((resolve, reject)=> {
            this.deleteOne(query)
            .then(result => result ? resolve(result) : reject(result), reject)
            .catch(reject)
        })
    }

    /**
     * @param {Object} query
     */
    static deleteManyOrFail(query){
        return new Promise((resolve, reject)=> {
            this.deleteMany(query)
            .then(result => result ? resolve(result) : reject(result), reject)
            .catch(reject)
        })
    }
}