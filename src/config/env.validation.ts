import { plainToInstance } from 'class-transformer';
import { IsString, IsNumber, IsOptional, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  PORT: number = 3000;

  @IsString()
  NODE_ENV: string = 'development';

  @IsString()
  DATABASE_URL: string;

  @IsString()
  OPENAI_API_KEY: string;

  @IsString()
  @IsOptional()
  OPENAI_EMBEDDING_MODEL?: string;

  @IsString()
  @IsOptional()
  OPENAI_CHAT_MODEL?: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(`Environment validation error: ${errors.toString()}`);
  }

  return validatedConfig;
}
