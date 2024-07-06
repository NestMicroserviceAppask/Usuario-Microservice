import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export class Usuario extends Document {
    @Prop()
    name:string

    @Prop()
    usuario:string

    @Prop()
    email:string

    @Prop()
    password:string

}
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
