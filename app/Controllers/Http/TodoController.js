'use strict'

const DB = use('Database')
const TodoModel = use("App/Models/Todo")

class TodoController {
    async todoAll ( { request, response } ) {
        const req = request.all()
        const todos = (
            await TodoModel.query().whereNull('deleted_at').andWhere('activity_group_id', req.activity_group_id).fetch()
        ).toJSON()

        return response.status(200).json({
            status: 'Success',
            message: 'Success',
            data: todos
        })
    }

    async todoID ( { params, response } ) {
        const todos = await TodoModel.query().where('id', params.id).orderBy('id').last()
        if(todos){
            return response.status(200).json({
                status: 'Success',
                message: 'Success',
                data: todos.toJSON()
            })
        }else{
            return response.status(404).json({
                status: 'Failed',
                message: `Activity with ID ${params.id} Not Found`,
                data: null
            })
        }
        
    }

    async todoPost ( { request, response } ) {
        let req = request.raw()
        req = JSON.parse(req)

        const todos = new TodoModel()
        try {
            todos.fill(req)
            await todos.save()
            const result = todos.toJSON()
            return response.status(201).json({
                status: 'Success',
                message: 'Success',
                data: {
                    ...result,
                    is_active: result.is_active == 1 ? true:false
                }
            })
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                status: 'Failed',
                message: error,
                data: null
            })
        }
    }

    async todoDelete ( { params, response } ) {
        const todos = await TodoModel.query().where('id', params.id).last()
        if(todos){
            try {
                todos.merge({
                    deleted_at: new Date()
                })
                await todos.save()
                return response.status(201).json({
                    status: 'Success',
                    message: 'Delete activity success',
                    data: null
                })
            } catch (error) {
                console.log(error);
                return response.status(400).json({
                    status: 'Failed',
                    message: error,
                    data: {}
                })
            }
        }else{
            return response.status(404).json({
                status: 'Not Found',
                message: `Activity with ID ${params.id} Not Found`,
                data: null
            })
        }
    }

    async todoUpdate ( { params, request, response } ) {
        let req = request.raw()
        req = JSON.parse(req)
        req.updated_at = new Date()
        req.deleted_at = null

        const todos = await TodoModel.query().where('id', params.id).last()
        if(todos){
            try {
                await DB.table('todos').where('id', params.id).update(req)
                const result = await TodoModel.query().where('id', params.id).last()
                return response.status(201).json({
                    status: 'Success',
                    message: 'Delete activity success',
                    data: result
                })
            } catch (error) {
                console.log(error);
                return response.status(400).json({
                    status: 'Failed',
                    message: error,
                    data: null
                })
            }
        }else{
            return response.status(404).json({
                status: 'Not Found',
                message: `Activity with ID ${params.id} Not Found`,
                data: null
            })
        }
    }
}

module.exports = TodoController
