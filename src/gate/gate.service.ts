import { Injectable } from '@nestjs/common';
import { CreateGateDto } from './dto/create-gate.dto';
import { UpdateGateDto } from './dto/update-gate.dto';

@Injectable()
export class GateService {
    create(CreateGateDto: CreateGateDto) {
        return 'This action adds a new section';
    }

    findAll() {
        return `This action returns all section`;
    }

    findOne(id: number) {
        return `This action returns a #${id} section`;
    }

    update(id: number, updateGateDto: UpdateGateDto) {
        return `This action updates a #${id} section`;
    }

    remove(id: number) {
        return `This action removes a #${id} section`;
    }
}
