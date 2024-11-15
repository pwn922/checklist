import { IsString, Matches } from "class-validator";

export class CreatePhotoUploadDto {
    base64Photo!: string;

    @IsString()
    filenameOriginal!: string;

    @IsString()
    @Matches(/^(jpeg|jpg|png)$/, {
        message: 'El tipo de archivo debe ser jpeg|jpg|png.',
    })
    type!: string;
}