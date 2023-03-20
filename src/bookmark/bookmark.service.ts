import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userID: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userID,
      },
    });
  }

  getBookmarkById(userID: number, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userID,
      },
    });
  }

  async createBookmark(userID: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userID,
        ...dto,
      },
    });

    return bookmark;
  }

  async editBookmarkById(
    userID: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    // get the bookmark by id
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    // check if user owns the bookmark
    if (!bookmark || bookmark.userID !== userID)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkById(userID: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });
    // check if user owns the bookmark
    if (!bookmark || bookmark.userID !== userID)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
