import mongoose from 'mongoose';
import { usersSchema } from './models/users.schema'

const usuariosModel = mongoose.model('usuarios', usersSchema)

class UsuariosManager {
    #usuariosDb
    constructor() {
        this.#usuariosDb = usuariosModel
    }

    async guardar(datosUsuario) {
        let usuarioGuardado = await this.#usuariosDb.create(datosUsuario)
        usuarioGuardado = JSON.parse(JSON.stringify(usuarioGuardado))
        return usuarioGuardado
    }

    async obtenerTodos() {
        return await this.#usuariosDb.find().lean()
    }

    async obtenerSegunId(id) {
        const usuario = await this.#usuariosDb.findById(id).lean()
        if (!usuario) throw new Error('NOT FOUND')
        return usuario
    }

    async obtenerSegunEmail(email) {
        const usuario = await this.#usuariosDb.findOne({ email }).lean()
        if (!usuario) throw new Error('NOT FOUND')
        return usuario
    }
}

export const usuariosManager = new UsuariosManager()