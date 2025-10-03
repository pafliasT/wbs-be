import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProjectDto {
    @IsOptional() @IsString() @MaxLength(50)
    code?: string;

    @IsOptional() @IsString() @MaxLength(200)
    name?: string;
}
