import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [ProductModule, AuthModule, UserModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
