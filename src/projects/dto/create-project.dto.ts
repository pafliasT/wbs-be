import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
    @IsString() @IsNotEmpty() @MaxLength(50)
    code!: string;

    @IsString() @IsNotEmpty() @MaxLength(200)
    name!: string;
}
