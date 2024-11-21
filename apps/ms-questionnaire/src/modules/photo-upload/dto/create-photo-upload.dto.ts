import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreatePhotoUploadDto {
    @IsNotEmpty()
    @IsString()
    base64Photo!: string;

    @IsString()
    @Matches(/\.(jpeg|jpg|png)$/i, {
        message: 'El nombre del archivo debe terminar en .jpeg, .jpg o .png.',
    })
    filenameOriginal!: string;

    @IsString()
    @Matches(/^image\/(jpeg|jpg|png)$/, {
        message: 'El tipo de archivo debe ser image/jpeg, image/jpg o image/png.',
    })
    mimeType!: string;
}