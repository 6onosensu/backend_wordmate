import { Controller, Patch, Delete, Body, Param } from "@nestjs/common";
import { MeaningService } from "./meaning.service";
import { CreateMeaningDto } from "./create-meaning.dto";

@Controller('meaning')
export class MeaningController {
  constructor(private meaningService: MeaningService) {}

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateDto: CreateMeaningDto) {
    return this.meaningService.update(+id, updateDto);
  }  

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.meaningService.remove(+id);
  }
}
