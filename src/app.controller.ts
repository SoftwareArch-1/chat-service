import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { prisma } from 'prisma/prismaClient';
import { MessagePatFromGateway } from './dto/gateway-sync';

@Controller()
export class AppController {
  @MessagePattern(MessagePatFromGateway.Favorite)
  async favorite(messageId: string) {
    try {
      const updatedPost = await prisma.post.update({
        where: {
          id: messageId,
        },
        data: {
          likes: {
            increment: 1,
          },
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
      const a = await prisma.post.create({
        data: {
          userId: data.userId,
          content: data.content,
          likes: 0,
          activityId: data.activityId,
        },
      });
      console.log(a);
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
