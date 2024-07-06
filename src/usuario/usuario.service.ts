import { Usuario } from './entities/usuario.entity';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto';

@Injectable()
export class UsuarioService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Usuario Service ');
  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }
  create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuario.create({
      data: createUsuarioDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPage = await this.usuario.count({where:{available:true}});
    const lastpage= Math.ceil(totalPage/limit)
    return {
      data: await this.usuario.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where:{
          available:true
        }
      }),
      meta:{
        page,
        totalPage,
        lastpage
      }
    };
  }

  async findOne(id: number) {
    try{
      const idusuario=await this.usuario.findUnique({
        where:{
          id:id,
          available:true
        }
      });
      if(idusuario){
        console.log('user fonmud: ' + idusuario)
      }else{
        console.log('user not found')
      }
      return idusuario;

    }catch(error){
      return{
        status:404,
        error: Error('The user not found in the databse ')
      }
    
    }
   
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const { id:_,...data} =updateUsuarioDto
    await this.findOne(id)
    return this.usuario.update({
      where:{id},
      data:data
    })
  }

  async remove(id: number) {
    await this.findOne(id)
   const usuario = await this.usuario.update({
    where:{id:id},
    data:{
      available:false
      
    }
  
   })
   return  usuario
  }
}
