import { AppDataSource } from '../configs/db'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { User } from '../entities/User';
import { Repository } from 'typeorm'
import { Follow } from '../entities/Follow';

interface FollowRequest {
    currentUserId: string
}

class FollowController {
    async followUser (req: Request, res: Response) {
        const id = req.params.userId
        const currentUserId = req.userId!
        try {
            if (id === currentUserId) {
                return res.status(403).json({ status: 'fail', msg: 'Acttion forbidden' })
            }
            const followRepo: Repository<Follow> = await AppDataSource.getRepository(Follow)
            const userFollowUser = await Follow.find({ where: { userFollowed: parseInt(id), userFollowing: parseInt(currentUserId)}})
            if (userFollowUser.length !== 0) {
                console.log(userFollowUser);
                return res.status(400).json({ status: 'fail', msg: 'Acttion forbidden' })
            }
            const newFollow: Follow = await new Follow()
            newFollow.userFollowed = parseInt(id)
            newFollow.userFollowing = parseInt(currentUserId)
            await followRepo.save(newFollow)
            res.status(200).json({ status: 'success', data: newFollow })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }

    async unFollowUser (req: Request, res: Response) {
        const id = req.params.userId
        const currentUserId = req.userId!
        try {
            if (id === currentUserId) {
                return res.status(403).json({ status: 'fail', msg: 'Acttion forbidden' })
            }
            const followRepo: Repository<Follow> = await AppDataSource.getRepository(Follow)
            const userFollowUser = await Follow.find({ where: { userFollowed: parseInt(id), userFollowing: parseInt(currentUserId)}})
            if (userFollowUser.length === 0) {
                console.log(userFollowUser);
                return res.status(400).json({ status: 'fail', msg: 'Acttion forbidden' })
            }
            console.log(userFollowUser);
            await followRepo.remove(userFollowUser[0])
            res.status(200).json({ status: 'success', data: userFollowUser[0] })
        } catch (error) {
            let msg
            if (error instanceof Error) {
                msg = error.message
            }
            res.status(500).json({ status: 'fail', msg })
        }
    }
}


export default new FollowController();