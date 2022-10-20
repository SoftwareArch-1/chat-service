import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { prisma } from 'prisma/prismaClient';
import { MessagePatFromGateway } from './dto/gateway-sync';

@Controller()
export class AppController {
  @MessagePattern(MessagePatFromGateway.Favorite)
  favorite(messageId: string) {
    try {
      const updatedPost = prisma.post.update({
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
  post(data: any) {
    try {
      prisma.post.create({
        data: {
          userId: data.userId,
          content: data.content,
          likes: 0,
          activityId: data.activityId,
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @MessagePattern(MessagePatFromGateway.GetAllByActivityId)
  getAllByActivityId(activityId: string) {
    try {
      const posts = prisma.post.findMany({
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
