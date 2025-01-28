import { Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth.dto'
import { DatabaseService } from 'src/database/database.service';
import hash from "bcrypt"

@Injectable()
export class AuthService {
  constructor(private prisma: DatabaseService) { }
  async register(createUserDto: SignUpDto) {
    const { name, contact, classroom, password, role,profilePicture } = createUserDto;
    const hashedPassword = await hash.hash(password, 10)
    const classroomId=classroom;
    await this.prisma.user.create({
      data: {
        name,
        role,
        classroomId,
        password: hashedPassword,
        contact,
        institutionId: 1,
        profilePicture
      }
    })
  }
  async login(createAuthDto: SignInDto) {
    const { phoneNumber, password } = createAuthDto;
    const user = await this.prisma.user.findUnique({
      where: {
        contact: phoneNumber
      }
    })
    if (!user) {
      return null
    }
    const passwordMatch = await hash.compare(password, user.password)
    if (!passwordMatch) {
      return null
    }
    return user
  }
}
