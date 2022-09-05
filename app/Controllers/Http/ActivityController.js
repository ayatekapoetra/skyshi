'use strict'

const DB = use('Database')
const ActivityModel = use("App/Models/Activity")
const TodoModel = use("App/Models/Todo")
const data = require('../../../activity')

class ActivityController {
    async activityAll ( { response } ) {
        const lenData = await ActivityModel.query().whereNull('deleted_at').orderBy('id', 'asc').getCount()
        if(lenData === 0){
            for (const item of data.data) {
                console.log(item);
                const addActivity = new ActivityModel()
                addActivity.fill(item)
                try {
                    await addActivity.save()
                } catch (error) {
                    console.log(error);
                }
            }
        }
        const activity = (
            await ActivityModel.query().orderBy('id').fetch()
        ).toJSON()

        return response.status(200).json({
            status: 'Success',
            message: 'Success',
            data: activity
        })
    }

    async activityID ( { params, response } ) {
        const activity = await ActivityModel.query().where('id', params.id).orderBy('id').last()
        if(activity){
            return response.status(200).json({
                status: 'Success',
                message: 'Success',
                data: activity.toJSON()
            })
        }else{
            return response.status(404).json({
                status: 'Failed',
                message: `Activity with ID ${params.id} Not Found`,
                data: null
            })
        }
        
    }

    async activityPost ( { request, response } ) {
        let req = request.raw()
        req = JSON.parse(req)

        const activity = new ActivityModel()
        try {
            activity.fill({email: req.email, title: req.title})
            await activity.save()
            return response.status(201).json({
                status: 'Success',
                message: 'Success',
                data: activity
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

    async activityDelete ( { params, response } ) {
        const activity = await ActivityModel.query().where('id', params.id).last()
        if(activity){
            try {
                await ActivityModel.query().where('id', params.id).delete()
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
                    data: null
                })
            }
        }else{
            return response.status(404).json({
                status: 'Not Found',
                message: `Activity with ID ${params.id} Not Found`,
                data: {}
            })
        }
    }

    async activityUpdate ( { params, request, response } ) {
        let req = request.raw()
        req = JSON.parse(req)
        req.updated_at = new Date()
        req.deleted_at = null

        const activity = await ActivityModel.query().where('id', params.id).last()
        if(activity){
            try {
                await DB.table('activities').where('id', params.id).update(req)
                const result = await ActivityModel.query().where('id', params.id).last()
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

module.exports = ActivityController
