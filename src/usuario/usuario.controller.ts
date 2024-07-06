import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginationDto } from 'src/common/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  //@Post()
  @MessagePattern({cmd:'created_Usuario'})
  create(@Payload() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.usuario.create({
      data:createUsuarioDto
    })
  }

  //@Get()
  @MessagePattern({cmd:'find_all_Usuario'})
  findAll(@Payload() paginationDto:PaginationDto) {
    return this.usuarioService.findAll(paginationDto)
  }

  //@Get(':id')
  @MessagePattern({cmd:'find_one_Usuario'})
  findOne(@Payload('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  //@Patch(':id')
  @MessagePattern({cmd:'updated_Usuario'})
  update(
          // @Param('id') id: string, 
          // @Body() updateUsuarioDto: UpdateUsuarioDto
          @Payload() updateUsuarioDto: UpdateUsuarioDto
        ) {
   
    return this.usuarioService.update(updateUsuarioDto.id, updateUsuarioDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd:'deleted_Usuario'})
  remove(@Payload('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
