import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import { GenderEnum, OtpEnum, ProviderEnum, RoleEnum } from "src/auth/common/enums/user.enums"


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


    @Prop({
        code:{
            type:String,
            required:true,
            max:6,
            min:6
        },
        expireIn:{
            type:Date,
            required:true,
            min:Date.now()
        },
        type:{
            type:Number,
            default:OtpEnum.register,
            enum:OtpEnum
        }
    })
    otp!:{
        code:string,
        expireIn:Date,
        type:OtpEnum

    }


    @Prop({
        type:Boolean,
        default:false
    })
    isEmailConfirmed!:boolean


    @Prop({
        type:String
    })
    profilePicture!:string


    @Prop({
        type:[String]
    })
    coverPicture!:string[]


    @Prop({
        type:Number,
        enum:RoleEnum,
        default:RoleEnum.user
    })
    role!:RoleEnum



    @Prop({
        type:Date
    })
    changedCreditTime!:Date
}


export const UserSchema = SchemaFactory.createForClass(User)


export const userModel = MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }])
