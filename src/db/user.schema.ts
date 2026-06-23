import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import { GenderEnum, ProviderEnum } from "src/auth/utilis/enums/user.enums"


export type IHUser = HydratedDocument<User>

@Schema({
    timestamps:true,
    strict:true,
    strictQuery:true,
    toJSON:{
        virtuals:true,
        getters:true
    },
    toObject:{
        virtuals:true,
        getters:true
    }
})
export class User{

    @Prop({
        type:String,
        required:true,
        trim:true
    })
    username!:string

    @Prop({
        type:String,
        required:true
    })
    email!:string

    @Prop({
        type:String,
        required:function(){
            return this.provider == ProviderEnum.system
        }
    })
    password!:string

    @Prop({
        type:Number,
        min:10,
        max:60
    })
    age!:number

    @Prop({
        type:Number,
        enum:GenderEnum
    })
    gender!: GenderEnum

    @Prop({
        type:Number,
        required:function(){
            return this.provider == ProviderEnum.system
        }
    })
    phone!: string

    @Prop({
        type:Number,
        enum:ProviderEnum
    })
    provider!: ProviderEnum
}


export const UserSchema = SchemaFactory.createForClass(User)


export const userModel = MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }])
