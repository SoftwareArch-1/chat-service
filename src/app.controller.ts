import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { prisma } from 'prisma/prismaClient';
import { MessagePatFromGateway } from './dto/gateway-sync';

@Controller()
export class AppController {
  @MessagePattern(MessagePatFromGateway.Favorite)
  async favorite(data: any) {
    try {
      const updatedPost = await prisma.post.update({
        where: {
          id: data.messageId,
        },
        data: {
          likes: {
            increment: 1,
          },
          //add user to likedUsers
          likedUsers: [...data.userId],
        },
      });
      return updatedPost;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @MessagePattern(MessagePatFromGateway.Post)
  async post(data: any) {
    try {
      const post = await prisma.post.create({
        data: {
          userId: data.userId,
          content: data.content,
          likes: 0,
          activityId: data.activityId,
        },
      });
      return post;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @MessagePattern(MessagePatFromGateway.GetAllByActivityId)
  async getAllByActivityId(activityId: string) {
    try {
      const posts = await prisma.post.findMany({
        where: {
          activityId: activityId,
        },
      });
      return posts;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
