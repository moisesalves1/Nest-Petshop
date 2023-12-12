import { Module } from '@nestjs/common';
import { ReportService } from './reports.service';
import { ReportsResolver } from './report.resolver';

@Module({
    providers: [ReportService, ReportsResolver]
})
export class ReportsModule {}
