import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import Ws from 'App/Services/WebSocketService';
export default class UsersController {
   public async index({response}: HttpContextContract) {
     try {
       const users = await User.all()
       return response.status(200).json({
         message: "Usuarios encontrados:",
         data: users
       })
     } catch (error) {
       return response.status(500).json({
         message: "Error al buscar usuarios",
         data: error
       })
     } finally {
       console.log('Finally')
       Ws.io.emit('prueba:emit', 'Prueba')
     }
   }
 

   public async show({ params, response }: HttpContextContract) {
       try {
         const user = await User.findOrFail(params.id)
         return response.status(200).json({
           message: 'Usuario encontrado exitosamente',
           data: user
         })
       } catch (error) {
         return response.status(404).json({
           message: 'Usuario no encontrado',
           error: error.message
         })
       }
   }

   public async update({ params, request, response }: HttpContextContract) {
       try {
         const user = await User.findOrFail(params.id)
           user.name = request.input('name')
           user.email = request.input('email')
           user.password = await Hash.make(request.input('password'))
         await user.save()
   
         return response.status(200).json({
           message: 'Usuario actualizado exitosamente',
           data: user
         })
       } catch (error) {
         return response.status(400).json({
           message: 'Error al actualizar usuario',
           error: error.message
         })
       }
   }

   public async destroy({ params, response }: HttpContextContract) {
       try {
         const user = await User.findOrFail(params.id)
         await user.delete()
   
         return response.status(204).json({
           message: 'Usuario eliminado exitosamente'
         })
       } catch (error) {
         return response.status(400).json({
           message: 'Error al eliminar usuario',
           error: error.message
         })
       }
   }
}
