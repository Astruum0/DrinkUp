import { Module } from "@nestjs/common"
import { UsersModule } from "./users.module"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "src/Models/users.model";
import { LocalStrategy } from "src/local.auth";
import { UsersService } from "src/Services/users.service";
import { AuthService } from "src/Services/auth.service";
import { AuthController } from "src/Controllers/auth.controller";


@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '60s' },
  }), MongooseModule.forFeature([{ name: "user", schema: UserSchema }])],
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule { }