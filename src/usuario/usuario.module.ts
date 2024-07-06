import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';

@Module({
  imports: [
    
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],

})
export class UsuarioModule {}
