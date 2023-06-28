import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { SpaceService } from './space.service';

@Controller('files')
@ApiTags('File')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }

        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    if (file.size > 1024 * 1024) {
      throw new BadRequestException('File too large');
    }
    return this.spaceService.uploadFile(file);
  }


  //THINKING OF HOW CAN I HANDLE MULTIPLE FILE UPLOAD FOR EVERY POST STILL COUDNT FIGURE OUT LETS SEE
  



  // @Post('post')
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 5 }]))
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     maximum: 5,
  //     properties: {
  //       image: {
  //         type: 'string',
  //         format: 'binary',
  //         maximum: 5,
  //       },
  //     },
  //   },
  // })
  // async uploadPost(@UploadedFiles() files: Express.Multer.File[]) {
  //   console.log(files);
  // }
}
